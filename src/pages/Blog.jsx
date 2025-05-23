import { useEffect, useState } from 'react';
import sanityClient from '../services/sanity';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { Helmet } from 'react-helmet';

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post"]{
        _id,
        title,
        slug,
        publishedAt,
        "author": author->name,
        mainImage {
          asset -> {
            url
          }
        }
      }`)
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <Helmet>
        <title>Grant Watson Blog</title>
        <meta name="description" content="Explore Grant Watson's developer blog." />
        <meta name="keywords" content="Grant Watson, software developer, full stack developer, React developer, C# developer, Blazor, Firebase, bug fixing, freelance web developer, REST API, portfolio website, resume site, .NET, JavaScript developer, Vite React developer, Sanity CMS, hire developer, developer for hire, fix React app, ticket system, web app developer, freelance programmer" />
        <meta name="author" content="Grant Watson" />
      </Helmet>

      <img
        src={logo}
        alt="Grant Watson Logo"
        style={{ maxWidth: '150px', marginBottom: '2rem' }}
      />

      <h2>GWS Blog</h2>

      <Link
        to="/"
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '0.25rem',
          marginBottom: '2rem',
          display: 'inline-block'
        }}
      >
        ← Back Home
      </Link>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              height: '420px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'left',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              border: '1px solid #ddd',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              boxShadow: '0 0 0 rgba(0,0,0,0)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
            }}
          >
            <Link
              to={`/blog/${post.slug.current}`}
              style={{ textDecoration: 'none', color: '#000', width: '100%' }}
            >
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{post.title}</h3>
            </Link>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Author: {post.author}</p>
            <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: '#888' }}>
              Posted: {new Date(post.publishedAt).toLocaleDateString()}
            </p>
            {post.mainImage?.asset?.url && (
              <img
                src={post.mainImage.asset.url}
                alt={post.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '0.25rem',
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;