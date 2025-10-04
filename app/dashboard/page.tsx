export default function Dashboard() {
  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: 16 }}>Justice Dashboard</h1>
      <p style={{ marginBottom: 16, color: '#666' }}>
        Dashboard is loading... This is a temporary page while the dashboard assets are being rebuilt.
      </p>
      <div style={{ 
        padding: 16, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 8,
        marginBottom: 16 
      }}>
        <h2 style={{ marginBottom: 8, fontSize: 18 }}>Available API Endpoints:</h2>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><a href="/api/version">/api/version</a> - Application version info</li>
          <li><a href="/api/env/check">/api/env/check</a> - Environment configuration check</li>
          <li><a href="/api/health">/api/health</a> - Health check</li>
          <li><a href="/api/auth/debug">/api/auth/debug</a> - Authentication debug</li>
        </ul>
      </div>
      <p style={{ fontSize: 14, color: '#888' }}>
        Note: The original dashboard assets had compatibility issues and have been temporarily replaced with this page.
      </p>
    </main>
  );
}