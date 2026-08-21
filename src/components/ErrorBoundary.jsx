import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1B1D16', color: '#EDE8D8', padding: 24, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, letterSpacing: '0.05em' }}>OPERAZIONE INTERROTTA</div>
          <div style={{ opacity: 0.7, marginTop: 8, maxWidth: 360 }}>Si è verificato un errore imprevisto. Ricarica la pagina — i tuoi dati restano salvati sul dispositivo.</div>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: 20, background: '#C1440E', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 700, cursor: 'pointer' }}
          >
            RICARICA
          </button>
          {this.state.error && (
            <pre style={{ marginTop: 16, fontSize: 11, opacity: 0.5, maxWidth: 360, overflow: 'auto', textAlign: 'left' }}>
              {String(this.state.error.message || this.state.error)}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
