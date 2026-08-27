#!/usr/bin/env node
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const PREVIEW_URL = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const OUT_DIR = 'docs/screenshots';

mkdirSync(OUT_DIR, { recursive: true });

const profile = {
  name: 'Marco',
  age: 45,
  weight: 82,
  heightCm: 178,
  customWork: '40',
  customRest: '20',
  weeklyGoal: 4,
  soundOn: true,
  vibrationOn: true,
  skipWarmup: false,
  intervalPreset: 'standard',
  level: 'combattente',
  lang: 'it',
  campStart: new Date(Date.now() - 5 * 86400000).toISOString(),
  seenIntro: true,
  seenTour: true,
};

function genSessions() {
  const now = Date.now();
  const progs = ['A','B','C','D','E','A','B','C'];
  return progs.map((pid, i) => ({
    date: new Date(now - (7 - i) * 86400000 + (i%2? 3600000:0)).toISOString(),
    programId: pid,
    programName: pid === 'A' ? 'ASSALTO PANCIA' : pid === 'B' ? 'BRUCIA GRASSI' : pid === 'C' ? 'TOTALE FORZA' : pid === 'D' ? 'RECUPERO ATTIVO' : 'PANCIA PIATTA',
    kcal: 180 + i*12,
    durationSec: 860 + i*20,
    peakHR: 135 + (i%3)*8,
    rpe: (i%5)+1,
    notes: i===2 ? 'Ottima spinta' : null,
  }));
}

const waistHistory = [
  { date: new Date(Date.now() - 14*86400000).toISOString(), cm: 98 },
  { date: new Date(Date.now() - 7*86400000).toISOString(), cm: 96 },
  { date: new Date(Date.now() - 1*86400000).toISOString(), cm: 95 },
];
const weightHistory = [
  { date: new Date(Date.now() - 14*86400000).toISOString(), kg: 84.2 },
  { date: new Date(Date.now() - 7*86400000).toISOString(), kg: 83.1 },
  { date: new Date(Date.now() - 1*86400000).toISOString(), kg: 82.4 },
];

async function seed(page) {
  await page.evaluate(({ profile, sessions, waistHistory, weightHistory }) => {
    localStorage.setItem('o40_profile', JSON.stringify(profile));
    localStorage.setItem('o40_sessions', JSON.stringify(sessions));
    localStorage.setItem('o40_waist', JSON.stringify(waistHistory));
    localStorage.setItem('o40_weight', JSON.stringify(weightHistory));
    localStorage.setItem('o40_largeText', '0');
    localStorage.setItem('o40_seenTour', '1');
    localStorage.setItem('o40_changelog_2.9.0', 'dismissed');
    localStorage.setItem('o40_changelog_2.8.4', 'dismissed');
    localStorage.setItem('o40_release_2.9.0', 'dismissed');
    localStorage.setItem('o40_release_2.8.4', 'dismissed');
    localStorage.setItem('o40_lastSw', 'o40-vtest');
  }, { profile, sessions: genSessions(), waistHistory, weightHistory });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  // dismiss any remaining modal (changelog) by pressing Escape
  await page.keyboard.press('Escape').catch(() => {});
  await page.waitForTimeout(400);
}

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    locale: 'it-IT',
  });
  const page = await context.newPage();

  console.log(`[screenshots] opening ${PREVIEW_URL}`);
  await page.goto(PREVIEW_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // seed data
  await seed(page);

  // 01 - Home (with aderenza card)
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT_DIR}/01-home.png`, fullPage: false });
  console.log('→ 01-home.png');

  // 02 - Library
  await page.getByRole('button', { name: /Libreria/i }).click().catch(async () => {
    // fallback: click by text
    await page.locator('text=Libreria').click();
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT_DIR}/02-libreria.png`, fullPage: false });
  console.log('→ 02-libreria.png');

  // 03 - Exercise detail (open first exercise)
  // click first exercise card
  const firstCard = page.locator('.o40-card').first();
  if (await firstCard.count() > 0) {
    await firstCard.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT_DIR}/03-esercizio-superman.png`, fullPage: false });
    console.log('→ 03-esercizio-superman.png');
    // close (click again or back)
    await page.keyboard.press('Escape').catch(()=>{});
    await page.waitForTimeout(400);
    // ensure back to library
    await page.goto(PREVIEW_URL, { waitUntil: 'networkidle' });
    await seed(page);
    await page.getByRole('button', { name: /Libreria/i }).click().catch(()=> page.locator('text=Libreria').click());
    await page.waitForTimeout(600);
  }

  // 04 - Session preview (from Home → tap mission)
  await page.goto(PREVIEW_URL, { waitUntil: 'networkidle' });
  await seed(page);
  await page.waitForTimeout(600);
  // tap main mission card
  const missionCard = page.locator('text=ASSALTO PANCIA').first();
  if (await missionCard.count() > 0) {
    await missionCard.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${OUT_DIR}/04-sessione-allenamento.png`, fullPage: false });
    console.log('→ 04-sessione-allenamento.png');
  } else {
    // fallback: tap any mission
    const anyMission = page.locator('text=Missione').first();
    if (await anyMission.count() > 0) {
      await anyMission.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `${OUT_DIR}/04-sessione-allenamento.png`, fullPage: false });
      console.log('→ 04-sessione-allenamento.png (fallback)');
    }
  }

  // 05 - Statistics (History) - tab label is Statistiche (it) / Stats (en)
  await page.goto(PREVIEW_URL, { waitUntil: 'networkidle' });
  await seed(page);
  await page.waitForTimeout(600);
  await page.getByRole('button', { name: /Statistiche|Stats|Statistik/i }).click().catch(async () => {
    await page.locator('text=Statistiche').click();
  });
  await page.waitForTimeout(1000);
  // scroll a bit to show aderenza + charts
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT_DIR}/05-statistiche.png`, fullPage: true });
  console.log('→ 05-statistiche.png (fullPage)');

  // Also capture a cropped version for README (first viewport)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT_DIR}/05-statistiche-crop.png`, fullPage: false });
  console.log('→ 05-statistiche-crop.png');

  await browser.close();
  console.log('\n[screenshots] Fatto — controlla docs/screenshots/');
}

run().catch(e => { console.error(e); process.exit(1); });
