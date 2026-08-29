import React, { useState, useEffect } from 'react';
import { Share2, Trophy, Users, Link as LinkIcon, Check, X } from 'lucide-react';
import { INK, INK_2, PAPER, OLIVE, OLIVE_DARK, KHAKI, BLAZE, BLAZE_DEEP, STEEL } from '../constants/theme.js';
import { generateInviteCode, parseInviteCode, getInviteLink, getLeaderboard, getSocialShareText } from '../utils/social.js';

export function SocialChallenge({ sessions = [], profile, lang = 'it' }) {
  const [friendCode, setFriendCode] = useState(() => {
    try { return localStorage.getItem('o40_friend_code') || ''; } catch { return ''; }
  });
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState(friendCode);

  const myCode = generateInviteCode(sessions, profile);
  const myLink = getInviteLink(myCode);
  const friendPayload = parseInviteCode((friendCode || '').trim());
  const lb = getLeaderboard(sessions, friendPayload);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const inv = url.searchParams.get('invite');
      if (inv && !friendCode) {
        const p = parseInviteCode(inv);
        if (p && !p.expired) {
          setFriendCode(inv);
          setInputCode(inv);
          localStorage.setItem('o40_friend_code', inv);
          // clean URL
          url.searchParams.delete('invite');
          window.history.replaceState({}, '', url.toString());
        }
      }
    } catch {}
  }, []);

  async function handleShare() {
    const text = getSocialShareText(lb, lang);
    const shareData = { title: 'Operator40 — Sfida', text: `${text} ${myLink}`, url: myLink };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {}
    try {
      await navigator.clipboard.writeText(`${text} ${myLink}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback prompt
      window.prompt(lang === 'it' ? 'Copia il link:' : 'Copy link:', myLink);
    }
  }

  function handleSaveFriend() {
    const c = (inputCode || '').trim();
    const p = parseInviteCode(c);
    if (!c) {
      localStorage.removeItem('o40_friend_code');
      setFriendCode('');
      return;
    }
    if (!p) {
      alert(lang === 'it' ? 'Codice non valido' : 'Invalid code');
      return;
    }
    if (p.expired) {
      alert(lang === 'it' ? 'Codice scaduto (>14gg)' : 'Code expired');
      return;
    }
    setFriendCode(c);
    try { localStorage.setItem('o40_friend_code', c); } catch {}
  }

  function handleClear() {
    setFriendCode('');
    setInputCode('');
    try { localStorage.removeItem('o40_friend_code'); } catch {}
  }

  const t = (it, en, de) => (lang === 'de' ? de : lang === 'en' ? en : it);

  return (
    <div style={{ background: `linear-gradient(135deg, ${INK_2} 0%, ${INK} 100%)`, border: `1px solid ${OLIVE}`, borderRadius: 16, padding: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.32)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Users size={16} color={BLAZE} />
        <span className="o40-mono" style={{ color: KHAKI, fontSize: 11, letterSpacing: '0.08em' }}>{t('SFIDA SETTIMANALE AMICI', 'WEEKLY FRIEND CHALLENGE', 'WÖCHENTLICHE FREUNDE-CHALLENGE')}</span>
        <span style={{ marginLeft: 'auto', color: STEEL, fontSize: 10 }}>{t('Lun-Dom kcal', 'Mon-Sun kcal', 'Mo-So kcal')}</span>
      </div>

      {/* Leaderboard */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {lb.entries.map((e, idx) => (
          <div key={e.id} style={{ flex: 1, background: idx === 0 ? `linear-gradient(135deg, ${BLAZE} 0%, ${BLAZE_DEEP} 100%)` : INK, border: `1px solid ${idx === 0 ? BLAZE : OLIVE}`, borderRadius: 12, padding: '10px 10px', textAlign: 'center', position: 'relative' }}>
            {idx === 0 && <Trophy size={12} color={PAPER} style={{ position: 'absolute', top: 6, right: 6 }} />}
            <div className="o40-mono" style={{ color: idx === 0 ? PAPER : STEEL, fontSize: 9 }}>{idx === 0 ? '1°' : '2°'} · {e.isMe ? t('TU', 'YOU', 'DU') : e.name.toUpperCase()}</div>
            <div className="o40-display" style={{ color: idx === 0 ? PAPER : KHAKI, fontSize: 22 }}>{e.kcal}</div>
            <div style={{ color: idx === 0 ? PAPER : STEEL, fontSize: 11 }}>{e.n} {t('sess.', 'sess.', 'Einh.')}</div>
          </div>
        ))}
      </div>

      {friendPayload && (
        <div style={{ marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: lb.diff >= 0 ? '#7FB06918' : `${BLAZE}18`, border: `1px solid ${lb.diff >= 0 ? '#7FB069' : BLAZE}33`, color: lb.diff >= 0 ? '#7FB069' : BLAZE, fontSize: 12, textAlign: 'center' }}>
          {lb.diff === 0 ? 'Pareggio — spingete!' : lb.diff > 0 ? `Sei avanti di ${lb.diff} kcal!` : `Sei dietro di ${Math.abs(lb.diff)} kcal`}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <button onClick={handleShare} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: BLAZE, color: PAPER, border: 'none', borderRadius: 10, padding: '10px 12px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          {copied ? <Check size={14} /> : <Share2 size={14} />} {copied ? t('Copiato!', 'Copied!', 'Kopiert!') : t('Invita amico', 'Invite friend', 'Freund einladen')}
        </button>
        <button onClick={() => { navigator.clipboard?.writeText(myCode).then(()=>{setCopied(true); setTimeout(()=>setCopied(false),1500);}); }} style={{ display: 'flex', alignItems: 'center', gap: 6, background: INK_2, color: KHAKI, border: `1px solid ${OLIVE}`, borderRadius: 10, padding: '10px 12px', fontSize: 12, cursor: 'pointer' }}>
          <LinkIcon size={13} /> {t('Copia codice', 'Copy code', 'Code kopieren')}
        </button>
      </div>

      <div className="o40-mono" style={{ color: STEEL, fontSize: 9, marginBottom: 6 }}>{t('Il tuo codice (condividi link):', 'Your code (share link):', 'Dein Code:')}</div>
      <div style={{ background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: '8px 10px', fontSize: 10, color: KHAKI, wordBreak: 'break-all', fontFamily: 'monospace' }}>{myCode}</div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <input value={inputCode} onChange={e=>setInputCode(e.target.value)} placeholder={t('Incolla codice amico', 'Paste friend code', 'Freundescode einfügen')} style={{ flex: 1, background: INK, border: `1px solid ${OLIVE}`, borderRadius: 8, padding: '8px 10px', color: PAPER, fontSize: 12 }} />
        <button onClick={handleSaveFriend} style={{ background: KHAKI, color: INK, border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>{t('Confronta', 'Compare', 'Vergleichen')}</button>
        {friendCode && <button onClick={handleClear} style={{ background: 'transparent', border: `1px solid ${STEEL}`, borderRadius: 8, padding: '8px 10px', cursor: 'pointer' }}><X size={14} color={STEEL} /></button>}
      </div>
      <div style={{ color: STEEL, fontSize: 10, marginTop: 6 }}>{t('No backend — solo kcal settimanali, codice scade dopo 14gg.', 'No backend — weekly kcal only, code expires in 14 days.', 'Kein Backend — nur wöchentliche kcal, Code 14 Tage gültig.')}</div>
    </div>
  );
}
