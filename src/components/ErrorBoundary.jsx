import React from 'react';

function isChunkError(msg) {
  const s = String(msg || '').toLowerCase();
  return s.includes('importing a module script failed') || s.includes('failed to fetch dynamically imported module') || s.includes('loading chunk') || s.includes('loading css chunk') || s.includes('chunkloaderror');
}

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, fixing: false, fixLog: '', isChunk: false, autoTried: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error, isChunk: isChunkError(error?.message || error) };
  }
  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
    // auto-retry once for chunk errors (stale PWA cache after deploy)
    if (isChunkError(error?.message || error) && !this.state.autoTried) {
      this.setState({ autoTried: true });
      const key = 'o40_chunk_retry';
      try {
        const last = Number(sessionStorage.getItem(key) || 0);
        if (Date.now() - last > 10000) {
          sessionStorage.setItem(key, String(Date.now()));
          setTimeout(() => window.location.reload(), 900);
        }
      } catch {}
    }
  }
  handleFix = async () => {
    this.setState({ fixing: true, fixLog: 'Pulizia cache...' });
    try {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        for (const r of regs) await r.unregister();
      }
      if (window.caches) {
        const keys = await caches.keys();
        for (const k of keys) await caches.delete(k);
      }
      try {
        localStorage.removeItem('o40_lastSw');
      } catch {}
      try {
        sessionStorage.clear();
      } catch {}
      this.setState({ fixLog: 'Fatto — ricarico...' });
      setTimeout(() => {
        window.location.href = './?v=' + Date.now() + '#force';
        window.location.reload();
      }, 600);
    } catch (e) {
      this.setState({ fixing: false, fixLog: 'Errore: ' + e.message });
    }
  };
  render() {
    if (this.state.hasError) {
      const isFixing = this.state.fixing;
      const isChunk = this.state.isChunk;
      return (
        <div
          style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1B1D16',
            color: '#EDE8D8',
            padding: 24,
            textAlign: 'center',
          }}
        >
          <div
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: '0.05em' }}
          >
            {isChunk ? 'AGGIORNAMENTO DISPONIBILE' : 'OPERAZIONE INTERROTTA'}
          </div>
          <div style={{ opacity: 0.7, marginTop: 8, maxWidth: 360 }}>
            {isChunk
              ? 'Stai caricando una versione precedente (cache PWA). Ricarica per la nuova build — i tuoi dati restano salvati.'
              : 'Si è verificato un errore imprevisto. I tuoi dati (missioni, foto, profilo) restano salvati — non disinstallare l’app.'}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 20,
              background: '#C1440E',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '12px 24px',
              fontWeight: 700,
              cursor: 'pointer',
              width: '100%',
              maxWidth: 360,
            }}
          >
            RICARICA
          </button>
          <button
            onClick={this.handleFix}
            disabled={isFixing}
            style={{
              marginTop: 10,
              background: isFixing ? '#4A5233' : '#242820',
              color: '#EDE8D8',
              border: '1px solid #4A5233',
              borderRadius: 10,
              padding: '12px 24px',
              fontWeight: 700,
              cursor: 'pointer',
              width: '100%',
              maxWidth: 360,
            }}
          >
            {isFixing ? 'PULIZIA IN CORSO...' : 'PULISCI CACHE PWA (mantiene i dati)'}
          </button>
          {this.state.fixLog && (
            <div style={{ marginTop: 10, fontSize: 11, opacity: 0.6 }}>{this.state.fixLog}</div>
          )}
          <a
            href="./force-update.html"
            style={{ marginTop: 12, fontSize: 12, color: '#B8AE8C', textDecoration: 'underline' }}
          >
            Apri pagina di recupero
          </a>
          {this.state.error && (
            <pre
              style={{
                marginTop: 16,
                fontSize: 11,
                opacity: 0.5,
                maxWidth: 360,
                overflow: 'auto',
                textAlign: 'left',
              }}
            >
              {String(this.state.error.message || this.state.error)}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
