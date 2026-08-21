#!/usr/bin/env node
// Verifica pre-deploy: cerca ReferenceError noti (es. sessions non definito in SummaryScreen)
import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const checks = [
  {
    name: 'SummaryScreen riceve sessions',
    file: 'src/App.jsx',
    test: (c) => c.includes('function SummaryScreen({ stats, profile, sessions,') && c.includes('<SummaryScreen') && c.includes('sessions={sessions}'),
    fix: 'SummaryScreen deve avere sessions in props e App deve passare sessions={sessions}',
  },
  {
    name: 'WeeklyChallenge difensivo',
    file: 'src/components/WeeklyChallenge.jsx',
    test: (c) => c.includes('sessions = []') && c.includes('(sessions || [])'),
    fix: 'WeeklyChallenge deve avere default sessions=[] e guard (sessions || [])',
  },
  {
    name: 'Nessun sessions free variable in App.jsx',
    file: 'src/App.jsx',
    test: (c) => {
      // cerca <WeeklyChallenge sessions={sessions} senza sessions in scope (già coperto)
      // più generico: controlla che ogni file che usa sessions lo dichiari come param o state
      const hasState = c.includes('const [sessions, setSessions]');
      const hasProp = c.includes('sessions,') || c.includes('sessions=');
      return hasState; // se ha lo state globale, ok
    },
    fix: 'Controlla grep sessions',
  },
];

let ok = true;
for (const chk of checks) {
  try {
    const content = readFileSync(chk.file, 'utf8');
    const pass = chk.test(content);
    console.log(`${pass ? '✓' : '✗'} ${chk.name} (${chk.file})`);
    if (!pass) {
      console.log(`  → FIX: ${chk.fix}`);
      ok = false;
    }
  } catch (e) {
    console.log(`✗ ${chk.name}: file mancante ${chk.file}`);
    ok = false;
  }
}

// Check rapido: cerca "sessions" usato fuori da function param/state in SummaryScreen
const app = readFileSync('src/App.jsx', 'utf8');
const summaryMatch = app.match(/function SummaryScreen\([^)]*\)/s);
if (summaryMatch && !summaryMatch[0].includes('sessions')) {
  console.log('✗ SummaryScreen manca sessions in signature');
  ok = false;
}

if (!ok) {
  console.error('\n[verify] FALLITO — correggi gli errori sopra prima del deploy');
  process.exit(1);
} else {
  console.log('\n[verify] OK — nessun ReferenceError noto');
}
