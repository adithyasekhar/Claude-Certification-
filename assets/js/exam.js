(function () {
  'use strict';
  var CCP = window.ClaudeCertPrep;
  CCP.mountChrome('exam');

  var root = document.querySelector('[data-exam-root]');
  var cert = CCP.get(CCP.param('id'));

  if (!cert) {
    root.innerHTML =
      '<div class="empty"><p>That certification is not in this repository.</p>' +
      '<p><a class="btn btn--quiet" href="index.html">Back to all certifications</a></p></div>';
    return;
  }

  document.title = 'Mock exam — ' + cert.name;

  var state = null;
  var tick = null;

  renderSetup();

  /* --------------------------------------------------------------- setup */

  function renderSetup() {
    var max = cert.questions.length;
    var options = [10, 25, max].filter(function (v, i, a) {
      return v <= max && a.indexOf(v) === i;
    });

    root.innerHTML =
      '<p style="margin-bottom:1rem"><a href="cert.html?id=' + cert.id +
      '" style="font-size:.9rem;color:var(--ink-mute)">Back to the ' + esc(cert.code) + ' blueprint</a></p>' +
      '<div class="setup">' +
      '<h2>Mock exam: ' + esc(cert.code) + '</h2>' +
      '<p style="color:var(--ink-soft)">The full paper is ' + cert.facts.items + ' questions in ' +
      cert.facts.minutes + ' minutes, matching the real exam, with each domain carrying its published share. ' +
      'Options are shuffled every attempt, and shorter drills keep the same weighting at a scaled timer.</p>' +
      '<div class="setup__field"><span>How many questions?</span><div class="segmented" id="len">' +
      options.map(function (v, i) {
        var suffix = v === cert.facts.items ? ' \u00B7 full paper' : ' \u00B7 drill';
        return '<label><input type="radio" name="len" value="' + v + '"' +
          (i === options.length - 1 ? ' checked' : '') + '>' + v + suffix + '</label>';
      }).join('') +
      '</div></div>' +
      '<div class="setup__field"><span>Mode</span><div class="segmented" id="mode">' +
      '<label><input type="radio" name="mode" value="exam" checked>Timed exam</label>' +
      '<label><input type="radio" name="mode" value="study">Study (feedback after each)</label>' +
      '</div></div>' +
      '<div class="btnrow" style="margin-top:1.75rem"><button class="btn" type="button" id="start">Start</button></div>' +
      '<p style="margin-top:1.25rem;font-size:.85rem;color:var(--ink-mute)">' +
      'These questions were written for this repository. They are not real exam items.</p>' +
      '</div>';

    document.getElementById('start').addEventListener('click', function () {
      var len = parseInt(document.querySelector('input[name="len"]:checked').value, 10);
      var mode = document.querySelector('input[name="mode"]:checked').value;
      begin(len, mode);
    });
  }

  /* ------------------------------------------------------------ sampling
     Allocate slots to domains by published weight, then fill each from that
     domain's pool. Rounding is probabilistic rather than largest-remainder:
     a domain worth 2.6% of a 20-question paper should appear about half the
     time, not never, and deterministic rounding would always drop it. The
     fractional part becomes the probability of an extra slot, then the total
     is corrected back to n. Any shortfall (a domain holding fewer questions
     than slots) is redistributed across the remaining pool, so the paper is
     always exactly the requested length. */

  function sample(n) {
    var pools = {};
    cert.questions.forEach(function (q) {
      (pools[q.domain] = pools[q.domain] || []).push(q);
    });

    var totalWeight = cert.domains.reduce(function (s, d) { return s + d.weight; }, 0);
    var alloc = cert.domains.map(function (d) {
      var exact = (d.weight / totalWeight) * n;
      var base = Math.floor(exact);
      var rem = exact - base;
      return { id: d.id, base: base + (Math.random() < rem ? 1 : 0), rem: rem };
    });

    var assigned = alloc.reduce(function (s, a) { return s + a.base; }, 0);

    /* Correct back to exactly n, biasing additions towards high remainders
       and removals towards low ones, but choosing randomly among them. */
    while (assigned !== n) {
      var pool = assigned < n
        ? alloc.slice().sort(function (a, b) { return b.rem - a.rem; })
        : CCP.shuffle(alloc.filter(function (a) { return a.base > 0; }));
      if (!pool.length) break;
      var target = assigned < n ? pool[Math.floor(Math.random() * Math.min(3, pool.length))] : pool[0];
      target.base += assigned < n ? 1 : -1;
      assigned += assigned < n ? 1 : -1;
    }

    var picked = [];
    var leftovers = [];

    alloc.forEach(function (a) {
      var pool = CCP.shuffle(pools[a.id] || []);
      var take = Math.min(a.base, pool.length);
      picked = picked.concat(pool.slice(0, take));
      leftovers = leftovers.concat(pool.slice(take));
    });

    leftovers = CCP.shuffle(leftovers);
    while (picked.length < n && leftovers.length) picked.push(leftovers.shift());

    return CCP.shuffle(picked).map(prepare);
  }

  /* Shuffle options while tracking where the correct ones moved. */
  function prepare(q) {
    var idx = q.options.map(function (_, i) { return i; });
    idx = CCP.shuffle(idx);
    return {
      ref: q,
      options: idx.map(function (i) { return q.options[i]; }),
      answer: idx.reduce(function (acc, orig, now) {
        if (q.answer.indexOf(orig) !== -1) acc.push(now);
        return acc;
      }, []).sort(function (a, b) { return a - b; })
    };
  }

  /* --------------------------------------------------------------- start */

  function begin(len, mode) {
    var items = sample(len);
    var perItem = (cert.facts.minutes * 60) / cert.facts.items;
    state = {
      items: items,
      mode: mode,
      at: 0,
      picks: items.map(function () { return []; }),
      locked: items.map(function () { return false; }),
      remaining: mode === 'exam' ? Math.round(perItem * items.length) : null,
      done: false
    };

    if (mode === 'exam') {
      tick = window.setInterval(function () {
        if (!state || state.done) return;
        state.remaining--;
        paintTimer();
        if (state.remaining <= 0) finish();
      }, 1000);
    }

    renderQuestion();
  }

  /* ------------------------------------------------------------ question */

  function renderQuestion() {
    var i = state.at;
    var item = state.items[i];
    var q = item.ref;
    var domain = CCP.domainOf(cert, q.domain);
    var multi = q.type === 'multi';
    var locked = state.locked[i];

    root.innerHTML =
      barHTML() +
      '<div class="qcard">' +
      '<div class="qcard__meta">' +
      '<b>Domain ' + (domain ? domain.n : '?') + '</b>' +
      '<span>' + esc(domain ? domain.title : '') + '</span>' +
      '</div>' +
      '<p class="qstem">' + esc(q.stem) + '</p>' +
      '<p class="qhint">' + (multi
        ? 'Select ' + (q.select || q.answer.length) + '.'
        : 'Select one.') + '</p>' +
      '<fieldset class="opts" id="opts"><legend class="visually-hidden">Answer options</legend></fieldset>' +
      '<div id="verdict"></div>' +
      '<div class="qnav" id="qnav"></div>' +
      '</div>';

    var opts = document.getElementById('opts');
    item.options.forEach(function (text, oi) {
      var chosen = state.picks[i].indexOf(oi) !== -1;
      var label = document.createElement('label');
      label.className = 'opt';
      if (locked) {
        label.setAttribute('data-locked', 'true');
        var correct = item.answer.indexOf(oi) !== -1;
        if (correct && chosen) label.setAttribute('data-state', 'right');
        else if (!correct && chosen) label.setAttribute('data-state', 'wrong');
        else if (correct) label.setAttribute('data-state', 'missed');
      } else if (chosen) {
        label.setAttribute('data-state', 'chosen');
      }

      var input = document.createElement('input');
      input.type = multi ? 'checkbox' : 'radio';
      input.name = 'q' + i;
      input.value = String(oi);
      input.checked = chosen;
      input.disabled = locked;
      input.addEventListener('change', function () { choose(oi, multi); });

      label.appendChild(input);
      label.appendChild(CCP.el('span', { class: 'opt__text', text: text }));
      opts.appendChild(label);
    });

    if (locked) showVerdict();
    paintNav();
    paintTimer();
  }

  function choose(oi, multi) {
    var picks = state.picks[state.at];
    if (multi) {
      var at = picks.indexOf(oi);
      if (at === -1) picks.push(oi); else picks.splice(at, 1);
      picks.sort(function (a, b) { return a - b; });
    } else {
      state.picks[state.at] = [oi];
    }
    renderQuestion();
  }

  function showVerdict() {
    var i = state.at;
    var item = state.items[i];
    var ok = same(state.picks[i], item.answer);
    document.getElementById('verdict').innerHTML =
      '<div class="verdict" data-ok="' + ok + '">' +
      '<div class="verdict__label">' + (ok ? 'Correct' : 'Not quite') + '</div>' +
      '<p>' + esc(item.ref.why) + '</p></div>';
  }

  /* ------------------------------------------------------------- chrome */

  function barHTML() {
    var pct = ((state.at) / state.items.length) * 100;
    return '<div class="exambar">' +
      '<span class="exambar__count">Question ' + (state.at + 1) + ' of ' + state.items.length + '</span>' +
      '<span style="font-size:.85rem;color:var(--ink-mute)">' + esc(cert.code) + '</span>' +
      (state.mode === 'exam' ? '<span class="exambar__timer" id="timer">--:--</span>' : '') +
      '<span class="progress"><i style="width:' + pct.toFixed(1) + '%"></i></span>' +
      '</div>';
  }

  function paintTimer() {
    if (state.mode !== 'exam') return;
    var t = document.getElementById('timer');
    if (!t) return;
    var s = Math.max(0, state.remaining);
    var m = Math.floor(s / 60);
    var r = s % 60;
    t.textContent = (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
    t.setAttribute('data-low', String(s <= 120));
  }

  function paintNav() {
    var nav = document.getElementById('qnav');
    var i = state.at;
    var answered = state.picks[i].length > 0;
    var last = i === state.items.length - 1;
    nav.innerHTML = '';

    if (i > 0) {
      nav.appendChild(btn('Previous', 'btn btn--quiet', function () {
        state.at--; renderQuestion();
      }));
    }

    var spacer = document.createElement('span');
    spacer.className = 'spacer';
    nav.appendChild(spacer);

    if (state.mode === 'study' && !state.locked[i]) {
      nav.appendChild(btn('Check answer', 'btn', function () {
        state.locked[i] = true; renderQuestion();
      }, !answered));
      return;
    }

    if (last) {
      nav.appendChild(btn('Finish and score', 'btn', finish));
    } else {
      nav.appendChild(btn('Next', 'btn', function () {
        state.at++; renderQuestion();
      }));
    }

    if (state.mode === 'exam' && !last) {
      nav.appendChild(btn('Finish early', 'btn btn--quiet', finish));
    }
  }

  function btn(text, cls, fn, disabled) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    b.textContent = text;
    if (disabled) b.disabled = true;
    b.addEventListener('click', fn);
    return b;
  }

  /* -------------------------------------------------------------- report */

  function finish() {
    if (state.done) return;
    state.done = true;
    if (tick) { window.clearInterval(tick); tick = null; }

    var correct = 0;
    var byDomain = {};

    state.items.forEach(function (item, i) {
      var d = item.ref.domain;
      byDomain[d] = byDomain[d] || { right: 0, total: 0 };
      byDomain[d].total++;
      if (same(state.picks[i], item.answer)) { correct++; byDomain[d].right++; }
    });

    var percent = Math.round((correct / state.items.length) * 100);
    var scaled = CCP.scale(percent);
    var passed = scaled >= cert.facts.pass;
    CCP.saveScore(cert.id, { scaled: scaled, percent: percent });

    var markerPct = ((cert.facts.pass - 100) / 900) * 100;

    var rows = cert.domains.map(function (d) {
      var s = byDomain[d.id];
      if (!s) return '';
      var pct = Math.round((s.right / s.total) * 100);
      return '<div class="brow" data-band="' + CCP.band(pct) + '">' +
        '<div class="brow__name">' + esc(d.title) +
        '<small>Domain ' + d.n + ' \u00B7 ' + d.weight + '% of the exam \u00B7 ' +
        s.right + ' of ' + s.total + ' here</small></div>' +
        '<div class="brow__track"><i style="width:' + pct + '%"></i></div>' +
        '<div class="brow__pct">' + pct + '%</div></div>';
    }).join('');

    var weakest = cert.domains.filter(function (d) { return byDomain[d.id]; })
      .map(function (d) {
        var s = byDomain[d.id];
        return { d: d, pct: (s.right / s.total) * 100 };
      })
      .sort(function (a, b) {
        return (a.pct - b.pct) || (b.d.weight - a.d.weight);
      })[0];

    root.innerHTML =
      '<div class="scorehero" data-pass="' + passed + '">' +
      '<div class="scorehero__num">' + scaled + '</div>' +
      '<div class="scorehero__verdict">' + (passed ? 'Above the pass mark' : 'Below the pass mark') + '</div>' +
      '<div class="scorehero__sub">' + correct + ' of ' + state.items.length +
      ' correct (' + percent + '%) \u00B7 ' + esc(cert.code) + '</div>' +
      '<div class="meter"><i style="width:' + Math.min(100, ((scaled - 100) / 900) * 100) + '%"></i>' +
      '<b style="left:' + markerPct + '%"></b></div>' +
      '</div>' +

      '<div style="margin-top:2.5rem"><div class="sectionhead"><h2>By domain</h2>' +
      '<p>The real score report also breaks results down this way. Weight matters: a weak domain worth 33% costs far more than a weak one worth 3%.</p></div>' +
      '<div class="breakdown">' + rows + '</div></div>' +

      (weakest && weakest.pct < 80 ?
        '<p class="callout" style="margin-top:1.5rem"><strong>Start here.</strong> ' +
        esc(weakest.d.title) + ' is your weakest domain on this attempt, and it carries ' +
        weakest.d.weight + '% of the exam. ' +
        '<a href="cert.html?id=' + cert.id + '#domain-' + weakest.d.id + '">Read the notes for it</a>.</p>'
        : '<p class="callout" style="margin-top:1.5rem"><strong>Solid across the board.</strong> ' +
        'No domain fell below 80% on this attempt. Re-sit for a fresh sample, or work through the ' +
        '<a href="cert.html?id=' + cert.id + '">full blueprint</a> to check the areas this paper did not reach.</p>') +

      '<p class="callout" style="margin-top:.8rem">' +
      'The scaled number is a straight conversion from percent correct. Anthropic does not publish its scaling, so use this as a readiness signal rather than a prediction.</p>' +

      '<div class="btnrow" style="margin-top:2rem">' +
      '<button class="btn" type="button" id="again">Sit another paper</button>' +
      '<a class="btn btn--quiet" href="cert.html?id=' + cert.id + '">Back to the blueprint</a>' +
      '<button class="btn btn--quiet" type="button" id="review">Review every question</button>' +
      '</div>' +
      '<div id="review-out"></div>';

    document.getElementById('again').addEventListener('click', renderSetup);
    document.getElementById('review').addEventListener('click', renderReview);
  }

  function renderReview() {
    var out = document.getElementById('review-out');
    document.getElementById('review').disabled = true;
    out.innerHTML = '<div class="sectionhead" style="margin-top:3rem"><h2>Every question</h2>' +
      '<p>Your answer, the correct answer, and why.</p></div>';

    state.items.forEach(function (item, i) {
      var ok = same(state.picks[i], item.answer);
      var d = CCP.domainOf(cert, item.ref.domain);
      var opts = item.options.map(function (text, oi) {
        var correct = item.answer.indexOf(oi) !== -1;
        var chosen = state.picks[i].indexOf(oi) !== -1;
        var st = correct && chosen ? 'right' : (!correct && chosen ? 'wrong' : (correct ? 'missed' : ''));
        return '<div class="opt" data-locked="true"' + (st ? ' data-state="' + st + '"' : '') + '>' +
          '<span class="opt__text">' + esc(text) + '</span></div>';
      }).join('');

      out.innerHTML +=
        '<div class="qcard" style="margin-top:.85rem">' +
        '<div class="qcard__meta"><b>' + (i + 1) + '</b>' +
        '<span>' + esc(d ? d.title : '') + '</span>' +
        '<span style="color:' + (ok ? 'var(--pass)' : 'var(--fail)') + '">' +
        (ok ? 'Correct' : (state.picks[i].length ? 'Incorrect' : 'Unanswered')) + '</span></div>' +
        '<p class="qstem">' + esc(item.ref.stem) + '</p>' +
        '<div class="opts" style="margin-top:1rem">' + opts + '</div>' +
        '<div class="verdict" data-ok="' + ok + '"><div class="verdict__label">Why</div>' +
        '<p>' + esc(item.ref.why) + '</p></div></div>';
    });
  }

  /* --------------------------------------------------------------- utils */

  function same(a, b) {
    if (a.length !== b.length || a.length === 0) return false;
    var x = a.slice().sort(), y = b.slice().sort();
    for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
    return true;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
})();
