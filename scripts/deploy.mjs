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
const pkgVersion = JSON.parse(readFileSync('package.json', 'utf8')).version;

function getVersion() {
  try {
    const hash = execSync('git rev-parse --short HEAD').toString().trim();
    return `${pkgVersion} · ${hash}`;
  } catch { return pkgVersion; }
}

function run(cmd, opts = {}) {
  console.log(`\n$ ${cmd}`);
  const r = spawnSync(cmd, { shell: true, stdio: 'inherit', ...opts });
  if (r.status !== 0) process.exit(r.status);
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
  // IMPORTANTE: build avviene su main (hash version corretto baked da vite.config.js),
  // quindi NON fare checkout su deploy-tmp prima di buildare, altrimenti il VERSION hash è sbagliato.
  const mainBranch = execSync('git branch --show-current').toString().trim();
  if (mainBranch === 'deploy-tmp') {
    console.error('[deploy] ERRORE: sei su deploy-tmp. La build va fatta su main per version hash corretto.');
    console.error('  Fai: git checkout main && npm run deploy -- --remote');
    process.exit(1);
  }
  const mainHash = execSync('git rev-parse --short HEAD').toString().trim();
  // Crea/aggiorna branch deploy-tmp con dist attuale
  run('git checkout deploy-tmp 2>&1 | tail -1');
  run('git add -f dist/');
  run(`git commit -m "deploy: ${pkgVersion} · ${mainHash}" 2>&1 | tail -1 || true`);
  run('git push origin deploy-tmp -f 2>&1 | tail -5');
  const commit = execSync('git rev-parse --short deploy-tmp').toString().trim();
  console.log(`\n[deploy] Pushed deploy-tmp @ ${commit}`);
  console.log(`[deploy] PRE-COMMIT main @ ${mainHash}`);
  // Liste asset per sync completo (index.html cita solo 3 chunk; gli altri sono import dinamici)
  const assetList = execSync(`git ls-tree -r deploy-tmp -- dist/assets/ | awk '{print $4}' | sed 's|dist/assets/||'`).toString().trim().split('\n');
  console.log(`[deploy] ${assetList.length} assets su deploy-tmp`);

  const syncScript = [
    'cd /var/www/vhosts/mikweb.eu/httpdocs/operator40',
    `COMMIT="${commit}"`,
    'REPO="Mikweb2025-design/operator40"',
    'BASE="https://raw.githubusercontent.com/$REPO/$COMMIT/dist"',
    'curl -sL $BASE/index.html -o index.html && curl -sL $BASE/sw.js -o sw.js && curl -sL $BASE/manifest.webmanifest -o manifest.webmanifest',
    'rm -rf assets && mkdir assets',
    `for f in ${assetList.join(' ')}; do curl -sL $BASE/assets/$f -o assets/$f; done`,
    'chown -R 501:staff assets index.html sw.js manifest.webmanifest',
    'chmod 755 assets; chmod 644 assets/*.js index.html sw.js manifest.webmanifest',
    'echo "assets: $(ls assets | wc -l)"; echo "version: $(grep -o \'VERSION = \\"[^\\"]*\\"\' assets/index-*.js | sort -u | head -1)"',
  ].join(' && ');

  console.log(`\n[deploy] Sync server — esegui via MCP mikweb_ssh_execute con i comandi sopra,`);
  console.log(`  oppure (se il fetch manuale assets è fatto) completa wasm/models/icons con:`);
  console.log('  for d in wasm models icons clips; do mkdir -p $d; curl -sL $BASE/$d/README.md -o $d/README.md; done');
}

console.log('\n[deploy] Fatto.\n');
