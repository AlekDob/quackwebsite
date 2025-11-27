import { notFound } from 'next/navigation';
import { getDocPage, getAllDocPaths, getNavigation } from '@/lib/docs';
import { DocsContent } from '@/components/docs/DocsContent';

interface DocsPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const paths = getAllDocPaths();
  return paths.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: DocsPageProps) {
  const page = getDocPage(params.slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `${page.title} | Quack Documentation`,
    description: `Learn about ${page.title} in the Quack documentation.`,
  };
}

export default function DocsPage({ params }: DocsPageProps) {
  const page = getDocPage(params.slug);

  if (!page) {
    notFound();
  }

  const navigation = getNavigation(page.slug);

  return (
    <DocsContent
      content={page.content}
      title={page.title}
      navigation={navigation}
    />
  );
}
