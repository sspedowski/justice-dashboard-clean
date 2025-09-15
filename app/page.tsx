export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>Justice Dashboard</h1>
      <p style={{ marginBottom: 16 }}>
        This is the clean Next shell. Click below to open the Dashboard UI.
      </p>
      <a
        href="/dashboard"
        style={{
          display: 'inline-block',
          padding: '10px 16px',
          borderRadius: 8,
          textDecoration: 'none',
          border: '1px solid #ccc',
        }}
      >
        Open Dashboard
      </a>
    </main>
  );
}
