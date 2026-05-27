import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const adminBaseUrl = import.meta.env.VITE_ADMIN_APP_BASE_URL ?? 'https://admin.grantwatson.dev/admin';

function buildAdminUrl(baseUrl, pathname, search, hash) {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');
  const adminPath = pathname.replace(/^\/admin(?:\/)?/, '');
  const suffix = adminPath ? `/${adminPath}` : '';

  return `${normalizedBaseUrl}${suffix}${search}${hash}`;
}

export default function AdminRedirect() {
  const location = useLocation();

  useEffect(() => {
    window.location.replace(buildAdminUrl(adminBaseUrl, location.pathname, location.search, location.hash));
  }, [location.hash, location.pathname, location.search]);

  const redirectTarget = buildAdminUrl(adminBaseUrl, location.pathname, location.search, location.hash);

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem', textAlign: 'center' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#6c757d' }}>
          Redirecting to admin
        </p>
        <h1 style={{ marginBottom: '1rem' }}>Opening the GWS admin workspace</h1>
        <p style={{ marginBottom: '1.5rem', color: '#555' }}>
          If the redirect does not happen automatically, use the button below.
        </p>
        <a
          href={redirectTarget}
          style={{
            display: 'inline-block',
            padding: '0.9rem 1.4rem',
            borderRadius: '0.5rem',
            backgroundColor: '#0d6efd',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Continue to Admin
        </a>
      </div>
    </main>
  );
}