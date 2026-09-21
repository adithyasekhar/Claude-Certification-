/* Claude Cert Prep — shared runtime.
   Data files call ClaudeCertPrep.register(...) to add a certification track. */

window.ClaudeCertPrep = (function () {
  'use strict';

  /* ------------------------------------------------------------- config
     Change this to your own repository after forking or pushing. It is the
     only place the URL appears. */
  var REPO_URL = 'https://github.com/adithyasekhar/Claude-Certification-';

  var certs = [];
  var byId = {};

  /* ------------------------------------------------------------ registry */

  function register(cert) {
    if (!cert || !cert.id) return;
    if (byId[cert.id]) return;
    cert.questions = cert.questions || [];
    cert.domains = cert.domains || [];
    certs.push(cert);
    byId[cert.id] = cert;
  }

  function all() { return certs.slice(); }
  function get(id) { return byId[id] || null; }

  function domainOf(cert, domainId) {
    for (var i = 0; i < cert.domains.length; i++) {
      if (cert.domains[i].id === domainId) return cert.domains[i];
    }
    return null;
  }

  function bankSize(cert) { return cert.questions.length; }

  /* ------------------------------------------------------------- storage */

  var KEY = 'ccp:scores:v1';

  function readScores() {
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }

  function bestScore(certId) {
    var s = readScores();
    return s[certId] || null;
  }

  function saveScore(certId, result) {
    try {
      var s = readScores();
      var prev = s[certId];
      if (!prev || result.scaled > prev.scaled) {
        s[certId] = {
          scaled: result.scaled,
          percent: result.percent,
          at: new Date().toISOString().slice(0, 10)
        };
        window.localStorage.setItem(KEY, JSON.stringify(s));
      }
      return true;
    } catch (e) { return false; }
  }

  function clearScores() {
    try { window.localStorage.removeItem(KEY); return true; }
    catch (e) { return false; }
  }

  /* --------------------------------------------------------------- theme */

  var THEME_KEY = 'ccp:theme';

  /* matchMedia is universal in browsers but absent in some test and embed
     environments, so fall back to light rather than throwing. */
  function prefersDark() {
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (e) { return false; }
  }

  function activeTheme() {
    return document.documentElement.getAttribute('data-theme') || (prefersDark() ? 'dark' : 'light');
  }

  function initTheme() {
    var saved = null;
    try { saved = window.localStorage.getItem(THEME_KEY); } catch (e) {}
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    paintToggle(btn);
    btn.addEventListener('click', function () {
      var next = activeTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { window.localStorage.setItem(THEME_KEY, next); } catch (e) {}
      paintToggle(btn);
    });
  }

  function paintToggle(btn) {
    var current = activeTheme();
    btn.textContent = current === 'dark' ? 'Light' : 'Dark';
    btn.setAttribute('aria-label', 'Switch to ' + (current === 'dark' ? 'light' : 'dark') + ' theme');
  }

  /* --------------------------------------------------------------- utils */

  function param(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'text') node.textContent = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else if (k === 'class') node.className = attrs[k];
        else if (attrs[k] !== null && attrs[k] !== undefined) node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c) node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  /* Deterministic-ish shuffle (Fisher-Yates with Math.random). */
  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Hue spread for domain colours: evenly spaced around a green-to-blue arc
     so the weight bar reads as one family rather than a rainbow. */
  function domainColor(index, total) {
    var start = 158, end = 232;
    var t = total <= 1 ? 0 : index / (total - 1);
    var hue = start + (end - start) * t;
    var dark = activeTheme() === 'dark';
    var light = dark ? (58 - 10 * t) : (30 + 12 * t);
    var sat = dark ? 40 : 46;
    return 'hsl(' + Math.round(hue) + ' ' + sat + '% ' + Math.round(light) + '%)';
  }

  /* -------------------------------------------------------------- scoring
     The live exams report a scaled score from 100 to 1,000 with 720 to pass.
     Anthropic does not publish its scaling function, so this is a plain
     linear map from percent correct. Treat it as a practice indicator, not a
     prediction of a real result. */
  function scale(percent) {
    return Math.round(100 + (900 * percent) / 100);
  }

  function band(percent) {
    if (percent < 60) return 'weak';
    if (percent < 80) return 'mid';
    return 'ok';
  }

  /* --------------------------------------------------------------- chrome */

  function mountChrome(activePage) {
    var head = document.querySelector('[data-masthead]');
    if (head) {
      head.innerHTML =
        '<div class="shell masthead__inner">' +
        '<a class="wordmark" href="' + rel('index.html') + '">' +
        '<span class="wordmark__glyph" aria-hidden="true"></span>Claude Cert Prep</a>' +
        '<nav class="navlinks" aria-label="Main">' +
        '<a href="' + rel('index.html') + '"' + cur(activePage, 'home') + '>Certifications</a>' +
        '<a href="' + rel('index.html') + '#how"' + cur(activePage, 'how') + '>How to use it</a>' +
        '<a href="' + REPO_URL + '">Source</a>' +
        '<button class="theme-toggle" type="button" data-theme-toggle>Dark</button>' +
        '</nav></div>';
    }
    var foot = document.querySelector('[data-sitefoot]');
    if (foot) {
      foot.innerHTML =
        '<div class="shell stack">' +
        '<p><strong>Independent study project.</strong> Not affiliated with, endorsed by, or sponsored by Anthropic. ' +
        '“Claude” and the certification names belong to Anthropic and are used here only to describe what the material prepares you for.</p>' +
        '<p>Exam facts — item counts, time limits, fees, pass marks and domain weights — are summarised from Anthropic’s published exam guides (v1.0, effective July 2026) and are accurate as of the last update to this repository. ' +
        'Always confirm the current guide before you book. Every practice question here was written from scratch for this project. None are real exam items, and none are reproduced from any other study resource.</p>' +
        '<p>Scores are stored only in your own browser. Nothing is uploaded anywhere. ' +
        '<button class="btn btn--quiet btn--small" type="button" data-clear-scores>Clear my saved scores</button></p>' +
        '</div>';
      var clr = foot.querySelector('[data-clear-scores]');
      if (clr) {
        clr.addEventListener('click', function () {
          clearScores();
          clr.textContent = 'Scores cleared';
          clr.disabled = true;
        });
      }
    }
    initTheme();
  }

  function cur(active, page) { return active === page ? ' aria-current="page"' : ''; }

  /* All pages sit at the repository root, so links are flat. Kept as a
     function so the site still works if pages move into folders later. */
  function rel(path) { return path; }

  return {
    register: register,
    all: all,
    get: get,
    domainOf: domainOf,
    bankSize: bankSize,
    bestScore: bestScore,
    saveScore: saveScore,
    clearScores: clearScores,
    mountChrome: mountChrome,
    param: param,
    el: el,
    shuffle: shuffle,
    domainColor: domainColor,
    scale: scale,
    band: band
  };
})();
