'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import Link from 'next/link';
import Image from 'next/image';

interface DocsContentProps {
  content: string;
  title: string;
  navigation?: {
    prev: { slug: string[]; title: string } | null;
    next: { slug: string[]; title: string } | null;
  };
}

export function DocsContent({ content, title, navigation }: DocsContentProps) {
  return (
    <div className="docs-content-wrapper">
      <article className="docs-content">
        <h1 className="docs-title">{title}</h1>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          ]}
          components={{
            // Custom image component
            img: ({ node, ...props }) => {
              const src = props.src || '';

              // Handle images from /images/ folder
              if (src.startsWith('/images/')) {
                return (
                  <span className="docs-image-wrapper">
                    <Image
                      src={src}
                      alt={props.alt || ''}
                      width={800}
                      height={600}
                      className="docs-image"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </span>
                );
              }

              return <img {...props} className="docs-image" />;
            },

            // Custom link component
            a: ({ node, ...props }) => {
              const href = props.href || '';

              // External links
              if (href.startsWith('http')) {
                return (
                  <a {...props} target="_blank" rel="noopener noreferrer" className="docs-link-external">
                    {props.children}
                  </a>
                );
              }

              // Internal doc links
              return (
                <Link href={href} className="docs-link">
                  {props.children}
                </Link>
              );
            },

            // Custom code block
            code: ({ node, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              const inline = !className;

              if (inline) {
                return (
                  <code className="docs-inline-code" {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <div className="docs-code-block">
                  {language && <div className="docs-code-language">{language}</div>}
                  <pre>
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            },

            // Custom headings with anchors
            h1: ({ node, ...props }) => <h1 className="docs-h1" {...props} />,
            h2: ({ node, ...props }) => <h2 className="docs-h2" {...props} />,
            h3: ({ node, ...props }) => <h3 className="docs-h3" {...props} />,

            // Custom paragraph
            p: ({ node, ...props }) => <p className="docs-p" {...props} />,

            // Custom lists
            ul: ({ node, ...props }) => <ul className="docs-ul" {...props} />,
            ol: ({ node, ...props }) => <ol className="docs-ol" {...props} />,
            li: ({ node, ...props }) => <li className="docs-li" {...props} />,

            // Custom table
            table: ({ node, ...props }) => (
              <div className="docs-table-wrapper">
                <table className="docs-table" {...props} />
              </div>
            ),

            // Custom blockquote
            blockquote: ({ node, ...props }) => (
              <blockquote className="docs-blockquote" {...props} />
            ),

            // Custom hr
            hr: ({ node, ...props }) => <hr className="docs-hr" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>

        {/* Navigation */}
        {navigation && (
          <div className="docs-navigation">
            {navigation.prev && (
              <Link
                href={`/docs/${navigation.prev.slug.join('/')}`}
                className="docs-nav-button docs-nav-prev"
              >
                <span className="docs-nav-label">Previous</span>
                <span className="docs-nav-title">{navigation.prev.title}</span>
              </Link>
            )}
            {navigation.next && (
              <Link
                href={`/docs/${navigation.next.slug.join('/')}`}
                className="docs-nav-button docs-nav-next"
              >
                <span className="docs-nav-label">Next</span>
                <span className="docs-nav-title">{navigation.next.title}</span>
              </Link>
            )}
          </div>
        )}
      </article>
    </div>
  );
}
