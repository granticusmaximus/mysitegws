import React from 'react';

const projects = [
  {
    name: 'Recipe Manager',
    url: 'https://meal.gwsapp.net/',
  },
  {
    name: 'Krissy Personal Site',
    url: 'https://krissype.gwsapp.net/',
  },
  {
    name: 'Password Generator',
    url: 'https://passgen.gwsapp.net/',
  },
  {
    name: 'Note App',
    url: 'https://notes.gwsapp.net/',
  },
];

const Portfolio = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Project Portfolio</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        {projects.map((project) => (
          <div
            key={project.url}
            style={{
              width: '300px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
          >
            <iframe
              src={project.url}
              title={project.name}
              style={{ width: '100%', height: '200px', border: 'none' }}
              loading="lazy"
            ></iframe>
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                textAlign: 'center',
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem' }}>{project.name}</h3>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007bff', textDecoration: 'none' }}
              >
                Visit Site
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;