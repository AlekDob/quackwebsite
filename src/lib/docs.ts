import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const docsDirectory = path.join(process.cwd(), 'docs/guide');

export interface DocMeta {
  title: string;
  pages: string[];
}

export interface DocPage {
  slug: string[];
  title: string;
  content: string;
  section: string;
}

export interface DocSection {
  id: string;
  title: string;
  pages: {
    slug: string;
    title: string;
  }[];
}

/**
 * Read _meta.json from a directory
 */
function readMeta(dir: string): DocMeta | null {
  const metaPath = path.join(dir, '_meta.json');
  if (!fs.existsSync(metaPath)) return null;

  const content = fs.readFileSync(metaPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Get all documentation sections
 */
export function getDocSections(): DocSection[] {
  const sections: DocSection[] = [];

  const items = fs.readdirSync(docsDirectory);

  for (const item of items) {
    const itemPath = path.join(docsDirectory, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      const meta = readMeta(itemPath);
      if (meta) {
        sections.push({
          id: item,
          title: meta.title,
          pages: meta.pages.map(pageSlug => ({
            slug: pageSlug,
            title: getTitleFromSlug(pageSlug),
          })),
        });
      }
    }
  }

  return sections.sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Convert slug to title (e.g., "introduction" -> "Introduction")
 */
function getTitleFromSlug(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get a specific doc page by slug
 */
export function getDocPage(slug: string[]): DocPage | null {
  if (slug.length === 0) return null;

  // slug can be: ["01-getting-started", "introduction"]
  const sectionId = slug[0];
  const pageSlug = slug[1] || slug[0]; // If only section, get first page

  const sectionPath = path.join(docsDirectory, sectionId);

  if (!fs.existsSync(sectionPath)) return null;

  const filePath = path.join(sectionPath, `${pageSlug}.md`);

  if (!fs.existsSync(filePath)) {
    // Try to get first page of section
    const meta = readMeta(sectionPath);
    if (meta && meta.pages.length > 0) {
      const firstPagePath = path.join(sectionPath, `${meta.pages[0]}.md`);
      if (fs.existsSync(firstPagePath)) {
        const fileContent = fs.readFileSync(firstPagePath, 'utf-8');
        const { data, content } = matter(fileContent);

        return {
          slug: [sectionId, meta.pages[0]],
          title: data.title || getTitleFromSlug(meta.pages[0]),
          content,
          section: sectionId,
        };
      }
    }
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || getTitleFromSlug(pageSlug),
    content,
    section: sectionId,
  };
}

/**
 * Get all possible doc paths for static generation
 */
export function getAllDocPaths(): { slug: string[] }[] {
  const paths: { slug: string[] }[] = [];
  const sections = getDocSections();

  for (const section of sections) {
    for (const page of section.pages) {
      paths.push({
        slug: [section.id, page.slug],
      });
    }
  }

  return paths;
}

/**
 * Get navigation info (prev/next pages)
 */
export function getNavigation(currentSlug: string[]) {
  const sections = getDocSections();
  const allPages: { slug: string[]; title: string }[] = [];

  // Flatten all pages
  for (const section of sections) {
    for (const page of section.pages) {
      allPages.push({
        slug: [section.id, page.slug],
        title: page.title,
      });
    }
  }

  // Find current page index
  const currentIndex = allPages.findIndex(
    p => p.slug[0] === currentSlug[0] && p.slug[1] === currentSlug[1]
  );

  return {
    prev: currentIndex > 0 ? allPages[currentIndex - 1] : null,
    next: currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null,
  };
}
