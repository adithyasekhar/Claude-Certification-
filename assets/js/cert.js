(function () {
  'use strict';
  var CCP = window.ClaudeCertPrep;
  CCP.mountChrome('cert');

  var root = document.querySelector('[data-cert-root]');
  var cert = CCP.get(CCP.param('id'));

  if (!cert) {
    root.innerHTML =
      '<section><div class="shell"><div class="empty">' +
      '<p>That certification is not in this repository.</p>' +
      '<p><a class="btn btn--quiet" href="index.html">Back to all certifications</a></p>' +
      '</div></div></section>';
    return;
  }

  document.title = cert.name + ' — Claude Cert Prep';

  var counts = {};
  cert.questions.forEach(function (q) { counts[q.domain] = (counts[q.domain] || 0) + 1; });

  /* --------------------------------------------------------------- hero */

  var hero = document.createElement('section');
  hero.className = 'hero';
  hero.innerHTML =
    '<div class="shell">' +
    '<p style="margin-bottom:.9rem"><a href="index.html" style="font-size:.9rem;color:var(--ink-mute)">All certifications</a></p>' +
    '<h1>' + esc(cert.name) + '</h1>' +
    '<p class="hero__lede">' + esc(cert.blurb) + '</p>' +
    '<div class="hero__meta">' +
    '<span>' + esc(cert.code) + '</span>' +
    '<span>' + esc(cert.tier) + '</span>' +
    '<span>' + cert.domains.length + ' domains</span>' +
    '<span>' + cert.questions.length + ' practice questions here</span>' +
    '</div>' +
    '<div class="btnrow" style="margin-top:1.75rem">' +
    '<a class="btn" href="exam.html?id=' + cert.id + '">Sit the mock exam</a>' +
    '<a class="btn btn--quiet" href="#blueprint">Read the blueprint</a>' +
    '</div>' +
    '</div>';
  root.appendChild(hero);

  /* -------------------------------------------------------------- facts */

  var factsSection = document.createElement('section');
  var f = cert.facts;
  factsSection.innerHTML =
    '<div class="shell">' +
    '<div class="sectionhead"><h2>The exam on paper</h2>' +
    '<p>Summarised from Anthropic&rsquo;s published exam guide (v1.0, effective July 2026). Confirm the current guide before booking.</p></div>' +
    '<dl class="facts">' +
    fact('Items', f.items) +
    fact('Time limit', f.minutes + ' minutes') +
    fact('Pass mark', f.pass + ' of ' + f.scaleRange) +
    fact('Exam fee', f.fee) +
    fact('Valid for', f.validity) +
    fact('Delivery', 'Pearson VUE, proctored') +
    '</dl>' +
    '<p class="callout" style="margin-top:1.25rem"><strong>Who it is for.</strong> ' + esc(cert.audience) + '</p>' +
    (cert.note ? '<p class="callout" style="margin-top:.8rem">' + esc(cert.note) + '</p>' : '') +
    '</div>';
  root.appendChild(factsSection);

  /* ---------------------------------------------------------- blueprint */

  var bp = document.createElement('section');
  bp.id = 'blueprint';
  bp.innerHTML =
    '<div class="shell">' +
    '<div class="sectionhead"><h2>Where the marks are</h2>' +
    '<p>Each block is sized to that domain&rsquo;s share of the exam. Select one to jump to its notes.</p></div>' +
    '<div class="weightbar" id="weightbar" role="list"></div>' +
    '<ul class="weightkey" id="weightkey"></ul>' +
    '<div id="domains" style="margin-top:2rem"></div>' +
    '</div>';
  root.appendChild(bp);

  var bar = bp.querySelector('#weightbar');
  var key = bp.querySelector('#weightkey');
  var list = bp.querySelector('#domains');
  var totalWeight = cert.domains.reduce(function (s, d) { return s + d.weight; }, 0);

  cert.domains.forEach(function (d, i) {
    var colour = CCP.domainColor(i, cert.domains.length);
    var pct = (d.weight / totalWeight) * 100;

    var seg = CCP.el('button', {
      class: 'weightbar__seg',
      type: 'button',
      role: 'listitem',
      style: 'flex: 0 0 ' + pct.toFixed(2) + '%; background:' + colour,
      title: 'Domain ' + d.n + ': ' + d.title + ' — ' + d.weight + '%'
    }, [CCP.el('span', { text: d.weight + '%' })]);

    seg.addEventListener('click', function () {
      var target = document.getElementById('domain-' + d.id);
      if (target) {
        target.open = true;
        target.scrollIntoView({ block: 'start' });
        target.querySelector('summary').focus();
      }
    });
    bar.appendChild(seg);

    key.appendChild(CCP.el('li', {}, [
      CCP.el('i', { style: 'background:' + colour, 'aria-hidden': 'true' }),
      d.n + '. ' + d.title
    ]));

    list.appendChild(buildDomain(d, colour));
  });

  function buildDomain(d, colour) {
    var det = document.createElement('details');
    det.className = 'domain';
    det.id = 'domain-' + d.id;

    var objectives = (d.objectives || []).map(function (o) {
      return '<li>' + esc(o) + '</li>';
    }).join('');

    var notes = (d.notes || []).map(function (n) {
      return '<p class="note">' + bold(n) + '</p>';
    }).join('');

    var traps = (d.traps || []).length
      ? '<div class="trap"><b>Where people lose marks.</b><ul style="margin:.5rem 0 0;padding-left:1.15rem">' +
        d.traps.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>'
      : '';

    var terms = (d.terms || []).length
      ? '<div class="terms">' + d.terms.map(function (t) {
          return '<code>' + esc(t) + '</code>';
        }).join('') + '</div>'
      : '';

    var n = counts[d.id] || 0;

    det.innerHTML =
      '<summary class="domain__summary" style="border-left:4px solid ' + colour + '">' +
      '<span class="domain__idx">Domain ' + d.n + '</span>' +
      '<span class="domain__title">' + esc(d.title) + '</span>' +
      '<span class="domain__pct" style="color:' + colour + '">' + d.weight + '%</span>' +
      '</summary>' +
      '<div class="domain__body">' +
      '<h4>What it covers</h4><ul class="objectives">' + objectives + '</ul>' +
      '<h4>Study notes</h4>' + notes + traps + terms +
      '<p style="margin-top:1.3rem;font-size:.86rem;color:var(--ink-mute)">' +
      n + ' practice question' + (n === 1 ? '' : 's') + ' in this repository cover this domain.</p>' +
      '</div>';
    return det;
  }

  /* --------------------------------------------------------------- cta */

  var cta = document.createElement('section');
  var best = CCP.bestScore(cert.id);
  cta.innerHTML =
    '<div class="shell">' +
    '<div class="sectionhead"><h2>Test yourself</h2>' +
    '<p>The mock draws a fresh weighted sample every time and shuffles the options, so re-sitting is a new paper rather than a memory test.' +
    (best ? ' Your best so far is ' + best.scaled + ' (' + best.percent + '% correct).' : '') + '</p></div>' +
    '<div class="btnrow">' +
    '<a class="btn" href="exam.html?id=' + cert.id + '">Start the mock exam</a>' +
    '<a class="btn btn--quiet" href="index.html">Compare all four tracks</a>' +
    '</div></div>';
  root.appendChild(cta);

  /* ------------------------------------------------------------- utils */

  function fact(label, value) {
    return '<div><dt>' + esc(label) + '</dt><dd>' + esc(String(value)) + '</dd></div>';
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* Allows **bold** and `code` inside study notes, nothing else. */
  function bold(s) {
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="font-family:var(--font-code);font-size:.88em;background:var(--surface-2);padding:.1em .35em;border-radius:3px">$1</code>');
  }
})();
