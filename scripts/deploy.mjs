#!/usr/bin/env node
// Deploy migliorato — locale deterministico + verifica + sync server
// Uso: node scripts/deploy.mjs [--local] [--remote] [--ios] [--skip-build]
import { execSync, spawnSync } from 'node:child_process';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const doLocal = args.includes('--local') || (!args.includes('--remote') && !args.includes('--ios'));
const doRemote = args.includes('--remote');
const doIos = args.includes('--ios');
const skipBuild = args.includes('--skip-build');

function run(cmd, opts = {}) {
  console.log(`\n$ ${cmd}`);
  const r = spawnSync(cmd, { shell: true, stdio: 'inherit', ...opts });
  if (r.status !== 0) process.exit(r.status);
}

function getVersion() {
  try {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    const hash = execSync('git rev-parse --short HEAD').toString().trim();
    return `${pkg.version} · ${hash}`;
  } catch { return 'dev'; }
}

console.log(`\n=== Operator40 deploy — ${getVersion()} ===`);
console.log(`Args: ${args.join(' ') || '(default: --local)'}`);

if (!skipBuild) {
  run('node scripts/verify.mjs');
  run('npm run build');
} else {
  console.log('[deploy] skip-build — uso dist esistente');
}

// Info build
try {
  const idx = readFileSync('dist/index.html', 'utf8').match(/index-[^"]*\.js/)?.[0];
  const sw = readFileSync('dist/sw.js', 'utf8').match(/o40-v[0-9a-f]{8}/)?.[0];
  console.log(`\n[deploy] dist/index.html → ${idx}`);
  console.log(`[deploy] dist/sw.js → ${sw}`);
  console.log(`[deploy] version → ${getVersion()}`);
  const assets = readdirSync('dist/assets');
  console.log(`[deploy] assets: ${assets.join(', ')}`);
} catch (e) {
  console.error('[deploy] dist non trovato — esegui npm run build');
  process.exit(1);
}

if (doLocal) {
  console.log('\n[deploy] Locale OK — dist pronta');
  console.log('  • Anteprima: npm run preview (http://localhost:4173) → apri su iPhone via http://<IP>:4173');
  console.log('  • iOS: npx cap sync && npx cap open ios');
}

if (doIos) {
  run('npx cap sync');
}

if (doRemote) {
  console.log('\n[deploy] Remote mikweb.eu — push su branch deploy-tmp e fetch via curl');
  const hash = execSync('git rev-parse --short HEAD').toString().trim();
  // Crea branch temporaneo con dist (force) — dist è gitignored, quindi -f
  run('git checkout -b deploy-tmp 2>&1 | tail -1');
  run('git add -f dist/');
  run(`git commit -m "deploy: ${getVersion()}" 2>&1 | tail -1`);
  run('git push origin deploy-tmp -f 2>&1 | tail -5');
  const commit = execSync('git rev-parse deploy-tmp').toString().trim();
  console.log(`\n[deploy] Pushed deploy-tmp @ ${commit}`);
  console.log(`[deploy] Ora su server mikweb eseguire:`);
  console.log(`  BASE="https://raw.githubusercontent.com/Mikweb2025-design/operator40/${commit}/dist"`);
  console.log(`  cd /var/www/vhosts/mikweb.eu/httpdocs/operator40 && \\`);
  console.log(`  curl -sL $BASE/index.html -o index.html && curl -sL $BASE/sw.js -o sw.js && \\`);
  console.log(`  mkdir -p assets && for f in $(ls dist/assets); do curl -sL $BASE/assets/$f -o assets/$f; done`);
  console.log(`  # poi rm vecchi assets e chown 501:staff`);
  console.log(`\n[deploy] Oppure usa MCP mikweb_ssh_execute con commit hash ${commit}`);
}

console.log('\n[deploy] Fatto.\n');
