// src/pages/BlogPost.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import sanityClient from '../services/sanity';
import { PortableText } from '@portabletext/react';
import { Helmet } from 'react-helmet';

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post" && slug.current == $slug][0]{
          title,
          publishedAt,
          body,
          mainImage {
            asset -> {
              url
            }
          }
        }`,
        { slug }
      )
      .then((data) => {
        if (!data) setPost(undefined);
        else setPost(data);
      })
      .catch(console.error);
  }, [slug]);

  if (post === null) return <p>Loading...</p>;
  if (post === undefined) return <p>Post not found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <Helmet>
        <title>{post.title} | Grant Watson Blog</title>
        <meta name="description" content={`Read blog post: ${post.title}`} />
      </Helmet>

      <Link to="/blog" style={{ display: 'inline-block', marginBottom: '1rem' }}>
        ← Back to Blog
      </Link>

      <h1>{post.title}</h1>
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
  );
}

export default BlogPost;