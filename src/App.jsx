import logo from './assets/img/logo.png';
import './App.css';

function App() {
  return (
    <div className="landing-page" style={{ textAlign: 'center', padding: '5rem 1rem', fontFamily: 'Arial, sans-serif' }}>
      <img
        src={logo}
        alt="Grant Watson Logo"
        style={{ maxWidth: '150px', marginBottom: '2rem' }}
      />
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Hi, I'm Grant Watson</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        Software Developer | Tech Enthusiast | Lifelong Learner
      </p>
      <a
        href="/src/assets/pdf/GWResume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          fontSize: '1.25rem',
          color: 'white',
          backgroundColor: '#007bff',
          borderRadius: '0.3rem',
          textDecoration: 'none',
        }}
      >
        View My Resume
      </a>
    </div>
  );
}

export default App;
