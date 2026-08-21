/* Share results via Web Share API with clipboard fallback */

export async function shareResults({ title, text, url }) {
  const shareUrl = url || (typeof location !== 'undefined' ? location.href : '');
  const shareData = { title, text, url: shareUrl };
  // Try native share
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return { ok: true, method: 'share' };
    } catch (e) {
      if (e && e.name === 'AbortError') return { ok: false, aborted: true };
    }
  }
  // Clipboard fallback
  const fullText = `${title}\n${text}\n${shareUrl}`;
  try {
    await navigator.clipboard.writeText(fullText);
    return { ok: true, method: 'clipboard' };
  } catch {
    // Fallback prompt
    window.prompt('Copia e condividi:', fullText);
    return { ok: true, method: 'prompt' };
  }
}

export async function shareSessionResult(session, t) {
  const name = session.programName || 'Missione';
  const title = t ? t('share.session.title') : 'Missione compiuta — Operator 40';
  const text = t ? t('share.session.text', { name, kcal: session.kcal, min: Math.round(session.durationSec / 60) }) : `${name} — ${Math.round(session.durationSec / 60)} min, ${session.kcal} kcal`;
  return shareResults({ title, text });
}
