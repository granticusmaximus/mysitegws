import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import resume from '../assets/pdf/GrantWatsonCV.pdf';

const Home = () => {
  return (
    <div className="landing-page" style={{ textAlign: 'left', padding: '5rem 1rem', fontFamily: 'Arial, sans-serif' }}>
      <Helmet>
        <title>Grant Watson | Full Stack Developer</title>
        <meta name="description" content="Explore Grant Watson's developer portfolio. Skilled in modern app development, bug fixing, and data scraping. Hire on Fiverr or view resume." />
        <meta name="keywords" content="Grant Watson, software developer, full stack developer, React developer, C# developer, Blazor, Firebase, bug fixing, freelance web developer, REST API, portfolio website, resume site, .NET, JavaScript developer, Vite React developer, Sanity CMS, hire developer, developer for hire, fix React app, ticket system, web app developer, freelance programmer" />        <meta name="author" content="Grant Watson" />
      </Helmet>
      <img
        src={logo}
        alt="Grant Watson Logo"
        style={{ maxWidth: '150px', marginBottom: '2rem' }}
      />
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Hi, I'm Grant Watson</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        Software Developer | Tech Enthusiast | Lifelong Learner
      </p>
      <div style={{ display: 'flex', justifyContent: 'left', gap: '1rem' }}>
        <Link
          to="/about"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1.25rem',
            color: 'white',
            backgroundColor: '#007bff',
            borderRadius: '0.3rem',
            textDecoration: 'none',
          }}
        >
          About
        </Link>
        <Link
          to="/blog"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1.25rem',
            color: 'white',
            backgroundColor: '#007bff',
            borderRadius: '0.3rem',
            textDecoration: 'none',
          }}
        >
          Blog
        </Link>
        <Link
          to="/contact"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1.25rem',
            color: 'white',
            backgroundColor: '#007bff',
            borderRadius: '0.3rem',
            textDecoration: 'none',
          }}
        >
          Contact Me
        </Link>
        <a
          href={resume}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1.25rem',
            color: 'white',
            backgroundColor: '#007bff',
            borderRadius: '0.3rem',
            textDecoration: 'none',
          }}
        >
          My CV
        </a>
      </div>
      <hr style={{ marginTop: '3rem', marginBottom: '1rem', border: 'none', borderTop: '2px solid #ccc', width: '60%' }} />
      <h2 style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '1.5rem' }}>Fiverr Gigs</h2>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'left', gap: '1rem', flexWrap: 'wrap' }}>
        <a
          href="https://www.fiverr.com/s/99o1eP0"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1.25rem',
            color: 'white',
            backgroundColor: '#6f42c1',
            borderRadius: '0.3rem',
            textDecoration: 'none',
          }}
        >
          I will develop a modern app
        </a>
        <a
          href="https://www.fiverr.com/s/YRlBrlR"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1.25rem',
            color: 'white',
            backgroundColor: '#6f42c1',
            borderRadius: '0.3rem',
            textDecoration: 'none',
          }}
        >
          I will create a web scraper
        </a>
        <a
          href="https://www.fiverr.com/s/wk4E05D"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1.25rem',
            color: 'white',
            backgroundColor: '#6f42c1',
            borderRadius: '0.3rem',
            textDecoration: 'none',
          }}
        >
          I will fix bugs in your app
        </a>
      </div>
      <br/><br/><br/>
      <center>
        <a href="https://www.jdoqocy.com/click-9338145-13942202" target="_top">
        <img src="https://www.ftjcfx.com/image-9338145-13942202" width="728" height="90" alt="" border="0"/></a>
      </center>
      
    </div>
  );
};

export default Home;