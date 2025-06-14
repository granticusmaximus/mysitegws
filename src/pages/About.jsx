import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>&larr; Back to Home</Link>
      </div>
      <h1>About Me</h1>
      <p>
        Hi, I'm <strong>Grant Watson</strong> — a Full Stack .NET Developer based in Georgia. With a career that began in 2017, I've had the opportunity to build and support software for government agencies like the Department of Defense, Department of Commerce, and Cherokee Nation.
      </p>
      <p>
        I specialize in crafting secure, scalable web applications using technologies like ASP.NET MVC, Blazor, SQL Server, and ReactJS. Whether it's modernizing legacy systems, creating custom reporting tools with SSRS, or building REST APIs, I thrive on writing clean, maintainable code that aligns with real-world needs.
      </p>
      <p>
        My background includes streamlining CI/CD pipelines, managing SQL data layers, supporting classic ASP codebases, and transforming ideas into usable tools for teams in high-stakes environments. I’ve worked on everything from crowdsource 5G feedback platforms to internal auditing dashboards for continuing education systems.
      </p>
      <p>
        When I'm not coding, I'm likely diving into sci-fi books, geeking out over new music, or dreaming up my next self-hosted project. I take pride in blending technical precision with a personal touch — every project is a chance to make something impactful.
      </p>
    </div>
  );
};

export default About;