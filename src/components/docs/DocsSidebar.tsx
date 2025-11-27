'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DocSection } from '@/lib/docs';

interface DocsSidebarProps {
  sections: DocSection[];
}

export function DocsSidebar({ sections }: DocsSidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.map(s => s.id))
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const isActivePage = (sectionId: string, pageSlug: string) => {
    return pathname === `/docs/${sectionId}/${pageSlug}`;
  };

  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar-header">
        <h2>Documentation</h2>
      </div>

      <nav className="docs-nav">
        {sections.map(section => (
          <div key={section.id} className="docs-nav-section">
            <button
              onClick={() => toggleSection(section.id)}
              className="docs-nav-section-title"
            >
              <span>{section.title}</span>
              <svg
                className={`chevron ${expandedSections.has(section.id) ? 'expanded' : ''}`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {expandedSections.has(section.id) && (
              <ul className="docs-nav-pages">
                {section.pages.map(page => (
                  <li key={page.slug}>
                    <Link
                      href={`/docs/${section.id}/${page.slug}`}
                      className={`docs-nav-page-link ${
                        isActivePage(section.id, page.slug) ? 'active' : ''
                      }`}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
