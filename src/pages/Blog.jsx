import { useEffect, useState } from 'react';
import sanityClient from '../services/sanity';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { Helmet } from 'react-helmet';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post"] | order(publishedAt desc){
        _id,
        title,
        slug,
        publishedAt,
        "author": author->name,
        mainImage {
          asset -> {
            url
          }
        },
        categories[]->{
          title,
          _id
        }
      }`)
      .then((fetchedPosts) => {
        setPosts(fetchedPosts);
        const categories = fetchedPosts.flatMap(p => p.categories || []);
        const unique = Array.from(new Map(categories.map(cat => [cat._id, cat])).values());
        setAllCategories(unique);
      })
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

      <div style={{ marginBottom: '1rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>&larr; Back to Home</Link>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <strong>Filter by Category:</strong>
        <button onClick={() => setSelectedCategory(null)} style={{ marginLeft: '1rem' }}>
          All
        </button>
        {allCategories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            style={{ marginLeft: '0.5rem' }}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {posts
          .filter(post => {
            if (!selectedCategory) return true;
            return post.categories?.some(c => c._id === selectedCategory);
          })
          .map((post) => (
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
      <hr/>
      <center>
        <p>
          This blog is sponsored by:
        </p>
        <a href="https://www.kqzyfj.com/im65iqzwqyDFEFIKFHKMDFEJEEGHM" target="_blank">
        <img src="https://www.lduhtrp.net/p8105xjnbhf0212572479021611349" alt="Corel Official Store" border="0"/></a>
      </center>
      <hr/>
    </div>
  );
}

export default Blog;