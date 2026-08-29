import { describe, it, expect } from 'vitest';
import { generateInviteCode, parseInviteCode, getInviteLink, getLeaderboard, getWeeklyStats, getSocialShareText } from './social.js';

describe('social — sfida settimanale', () => {
  const mockSessions = [
    { date: new Date().toISOString(), kcal: 180 },
    { date: new Date().toISOString(), kcal: 210 },
    { date: new Date(Date.now() - 8*86400000).toISOString(), kcal: 99 }, // last week, should not count
  ];
  const profile = { name: 'Marco' };

  it('getWeeklyStats counts only this week', () => {
    const wk = getWeeklyStats(mockSessions);
    expect(wk.n).toBe(2);
    expect(wk.kcal).toBe(390);
  });

  it('generate + parse round-trip', () => {
    const code = generateInviteCode(mockSessions, profile);
    expect(code.length).toBeGreaterThan(10);
    expect(code.includes('+') || code.includes('/')).toBe(false); // url safe
    const p = parseInviteCode(code);
    expect(p.k).toBe(390);
    expect(p.n).toBe(2);
    expect(p.name).toBe('Marco');
    expect(p.v).toBe(1);
  });

  it('parse invalid returns null', () => {
    expect(parseInviteCode('!!!')).toBe(null);
    expect(parseInviteCode('')).toBe(null);
    expect(parseInviteCode(null)).toBe(null);
  });

  it('expired code flagged', () => {
    const old = { v:1, wk:'2026-01-01', k:100, n:1, s:100, name:'Test', ts: Date.now() - 15*86400000 };
    const b64 = btoa(JSON.stringify(old)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
    const p = parseInviteCode(b64);
    expect(p.expired).toBe(true);
  });

  it('getInviteLink is mikweb.eu with invite param', () => {
    const link = getInviteLink('ABC123');
    expect(link).toBe('https://mikweb.eu/operator40/?invite=ABC123');
  });

  it('getLeaderboard sorts by kcal', () => {
    const code = generateInviteCode([{date:new Date().toISOString(), kcal: 500}], {name:'Luca'});
    const friend = parseInviteCode(code);
    const lb = getLeaderboard(mockSessions, friend);
    expect(lb.entries[0].kcal).toBe(500);
    expect(lb.entries[1].kcal).toBe(390);
    expect(lb.diff).toBe(-110);
  });

  it('getLeaderboard without friend shows only me', () => {
    const lb = getLeaderboard(mockSessions, null);
    expect(lb.entries.length).toBe(1);
    expect(lb.entries[0].isMe).toBe(true);
  });

  it('share text i18n', () => {
    const lb = getLeaderboard(mockSessions, null);
    expect(getSocialShareText(lb, 'it')).toContain('sfida settimanale');
    expect(getSocialShareText(lb, 'en')).toContain('weekly challenge');
    expect(getSocialShareText(lb, 'de')).toContain('Wochen');
  });
});
