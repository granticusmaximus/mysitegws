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
    affiliateAd: ({ value }) => (
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <a href={value.linkUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={value.imageUrl}
            alt={value.alt || 'Affiliate Ad'}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </a>
      </div>
    ),
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
      <div>
        <hr/>
        <center>
          <a href="https://www.kqzyfj.com/click-9338145-15762153" target="_blank">Land Your Next $100k Job with Ladders</a><img src="https://www.awltovhc.com/image-9338145-15762153" width="1" height="1" border="0"/>
        </center>
        <hr/>
      </div>
    </div>
  );
}

export default BlogPost;