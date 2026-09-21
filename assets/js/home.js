(function () {
  'use strict';
  var CCP = window.ClaudeCertPrep;
  CCP.mountChrome('home');

  var certs = CCP.all().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  var board = document.getElementById('board');
  var total = 0;

  certs.forEach(function (cert) {
    total += cert.questions.length;

    var row = document.createElement('div');
    row.className = 'board__row';

    var name = CCP.el('div', { class: 'board__name' }, [
      CCP.el('a', { href: 'cert.html?id=' + cert.id }, [
        CCP.el('strong', { text: cert.name })
      ]),
      CCP.el('span', {}, [
        CCP.el('span', { class: 'tier', 'data-tier': cert.tier, text: cert.tier }),
        ' \u00A0' + cert.code + ' \u00B7 ' + cert.domains.length + ' domains \u00B7 ' +
        cert.questions.length + ' practice questions'
      ])
    ]);

    var items = CCP.el('div', { class: 'board__num', text: String(cert.facts.items) });
    var mins = CCP.el('div', { class: 'board__num', text: String(cert.facts.minutes) });

    var best = CCP.bestScore(cert.id);
    var bestCell = CCP.el('div', { class: 'board__best' });
    if (best) {
      bestCell.setAttribute('data-state', best.scaled >= cert.facts.pass ? 'pass' : 'fail');
      bestCell.appendChild(CCP.el('strong', { text: String(best.scaled) }));
      bestCell.appendChild(document.createTextNode(' \u00B7 ' + best.percent + '%'));
    } else {
      bestCell.textContent = 'Not attempted';
    }

    var action = CCP.el('a', {
      class: 'btn',
      href: 'exam.html?id=' + cert.id,
      text: best ? 'Re-sit mock' : 'Sit mock exam'
    });

    row.appendChild(name);
    row.appendChild(items);
    row.appendChild(mins);
    row.appendChild(bestCell);
    row.appendChild(action);
    board.appendChild(row);
  });

  var stat = document.getElementById('stat-questions');
  if (stat) stat.textContent = total + ' practice questions across 4 tracks';
})();
