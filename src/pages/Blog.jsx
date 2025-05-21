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
        <meta name="keywords" content="Grant Watson, software developer, full stack developer, React developer, C# developer, Blazor, Firebase, bug fixing, freelance web developer, REST API, portfolio website, resume site, .NET, JavaScript developer, Vite React developer, Sanity CMS, hire developer, developer for hire, fix React app, ticket system, web app developer, freelance programmer" />        <meta name="author" content="Grant Watson" />

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
        }}
      >
        ← Back Home
      </Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {posts.map((post) => (
          <div key={post._id} style={{ flex: '1 0 calc(20% - 2rem)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Link to={`/blog/${post.slug.current}`}>
              <h3>{post.title}</h3>
            </Link>
            <p>Author: {post.author}</p>
            <p>Posted: {new Date(post.publishedAt).toLocaleDateString()}</p>
            {post.mainImage?.asset?.url && (
              <img
                src={post.mainImage.asset.url}
                alt={post.title}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;