// src/pages/BlogPost.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const [post, setPost] = useState(null);

  useEffect(() => {
    sanityClient
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
          },
          seo {
            metaTitle,
            metaDescription,
            keywords,
            canonicalUrl
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
        <title>{post.seo?.metaTitle || `${post.title} | Grant Watson Blog`}</title>
        {post.seo?.metaDescription && (
          <meta name="description" content={post.seo.metaDescription} />
        )}
        {post.seo?.keywords && (
          <meta name="keywords" content={post.seo.keywords.join(', ')} />
        )}
        {post.seo?.canonicalUrl && (
          <link rel="canonical" href={post.seo.canonicalUrl} />
        )}
        <meta property="og:title" content={post.seo?.metaTitle || post.title} />
        <meta property="og:description" content={post.seo?.metaDescription || ''} />
        <meta property="og:type" content="article" />
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