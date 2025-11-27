import { getDocSections } from '@/lib/docs';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import './docs.css';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = getDocSections();

  return (
    <div className="docs-layout">
      <DocsSidebar sections={sections} />
      <main className="docs-main">{children}</main>
    </div>
  );
}
