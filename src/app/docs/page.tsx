import { redirect } from 'next/navigation';

export default function DocsIndexPage() {
  // Redirect to the first page (introduction)
  redirect('/docs/01-getting-started/introduction');
}
