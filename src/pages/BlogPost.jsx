// src/pages/BlogPost.jsx
import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import sanityClient from '../services/sanity';
import { PortableText } from '@portabletext/react';
import { Helmet } from 'react-helmet';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

const components = {
  types: {
    code: ({ value }) => {
      return (
        <div style={{ marginBottom: '1rem' }}>
          <SyntaxHighlighter
            language={value.language || 'javascript'}
            style={vscDarkPlus}
            showLineNumbers
            wrapLongLines
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      );
    },
  },
};

function BlogPost() {
  const { slug } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isPreview = queryParams.get('preview') === 'true';
  const previewToken = queryParams.get('token');
  const SHARED_PREVIEW_SECRET = import.meta.env.VITE_PREVIEW_SECRET;
  const isTokenValid = !isPreview || previewToken === SHARED_PREVIEW_SECRET;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const clientConfig = {
      ...sanityClient.config(),
      useCdn: !isPreview,
      token: isPreview ? previewToken : undefined,
    };
    const previewClient = sanityClient.withConfig(clientConfig);

    previewClient
      .fetch(
        `*[_type == "post" && slug.current == $slug][0]{
          title,
          publishedAt,
          body,
          bodyMarkdown,
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
  }, [slug, isPreview, previewToken]);

  if (post === null) return <p>Loading...</p>;
  if (post === undefined) return <p>Post not found.</p>;
  if (!isTokenValid) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>🚫 Unauthorized</h2>
        <p>The provided preview token is invalid.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      {isPreview && (
        <div style={{ backgroundColor: '#fffae6', padding: '1rem', marginBottom: '1rem', border: '1px solid #f0c36d' }}>
          <strong>Preview Mode:</strong> This is a draft preview.
        </div>
      )}
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
          style={{ maxWidth: '100%', marginBottom: '1.5rem' }}
        />
      )}

      {post.body ? (
        <PortableText value={post.body} components={components} />
      ) : post.bodyMarkdown ? (
        <div style={{ marginTop: '2rem' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {post.bodyMarkdown}
          </ReactMarkdown>
        </div>
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
}

export default BlogPost;