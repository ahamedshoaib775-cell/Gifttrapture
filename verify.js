'use strict';
const fs = require('fs');
const path = require('path');
let passed = 0, failed = 0;

function chk(label, fn) {
  try {
    const r = fn();
    if (r) { console.log('  PASS', label); passed++; }
    else   { console.log('  FAIL', label); failed++; }
  } catch(e) { console.log('  FAIL', label, e.message); failed++; }
}

const FILES = ['giftrapture_app.html', 'giftrapture_admin.html', 'login.html'];

// ── 1. File existence ──────────────────────────────────
FILES.forEach(f => chk('EXISTS  ' + f, () => fs.existsSync(f)));

// ── 2. Syntax ──────────────────────────────────────────
FILES.forEach(f => {
  chk('SYNTAX  ' + f, () => {
    const m = fs.readFileSync(f,'utf8').match(/<script>([\s\S]*?)<\/script>/);
    new Function(m[1]);
    return true;
  });
});

const app = fs.readFileSync('giftrapture_app.html', 'utf8');

// ── 3. No crashed-cart triggers ────────────────────────
chk('NO inline filterByRelation in app.html', () =>
  !/onclick="filterByRelation/.test(app));

chk('All 5 relation cards have data-rel instead of onclick', () => {
  const m = app.match(/data-rel="(\w+)"/g);
  return m && m.length === 5;
});

chk('Event delegation wired (DOMContentLoaded + relations-grid)', () =>
  app.includes('DOMContentLoaded') && app.includes('relations-grid'));

chk('Filter buttons have safe inline onclick', () => {
  // applyShopFilter is defined at parse time, safe for preview
  return /onclick="applyShopFilter\(/.test(app);
});

// ── 4. Cart ─────────────────────────────────────────────
chk('toggleCart() function defined in app script', () =>
  /function\s+toggleCart\s*\(/.test(app));

chk('addToCart() function defined in app script', () =>
  /function\s+addToCart\s*\(/.test(app));

chk('renderCart() function defined in app script', () =>
  /function\s+renderCart\s*\(/.test(app));

chk('Cart HTML elements present (panel + overlay)', () =>
  app.includes('id="cart-panel"') && app.includes('id="cart-overlay"'));

// ── 5. App is a single file (no external deps) ───────
chk('No external JS deps', () => {
  const jsBundles = app.match(/<script\s+src=/g);
  return !jsBundles;
});

const admin = fs.readFileSync('giftrapture_admin.html', 'utf8');
chk('Admin guards present for filterByRelation', () =>
  admin.includes('function filterByRelation'));

const login = fs.readFileSync('login.html', 'utf8');
chk('Login page syntax valid', () => {
  const m = login.match(/<script>([\s\S]*?)<\/script>/);
  new Function(m[1]);
  return true;
});

// ── Summary ─────────────────────────────────────────────
console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed > 0 ? 1 : 0);