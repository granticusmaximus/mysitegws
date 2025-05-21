import { useEffect, useState } from 'react';
import sanityClient from '../services/sanity';
import { PortableText } from '@portabletext/react';
import { Link } from 'react-router-dom';

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post"]{
        _id,
        title,
        slug,
        publishedAt,
        body,
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
      <h2>My Blog</h2>
      {posts.map((post) => (
        <div key={post._id} style={{ marginBottom: '2rem' }}>
          <Link to={`/blog/${post.slug.current}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
          {post.mainImage?.asset?.url && (
            <img
              src={post.mainImage.asset.url}
              alt={post.title}
              style={{ maxWidth: '100%' }}
            />
          )}
          <PortableText value={post.body} />
        </div>
      ))}
    </div>
  );
}

export default Blog;