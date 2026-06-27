import { notFound } from 'next/navigation';

import PageContainer from '@admin/components/layout/page-container';
import ContentWorkspace from '@admin/features/content/content-workspace';
import { contentWorkspaces } from '@admin/features/content/content-data';

export function generateStaticParams() {
  return Object.keys(contentWorkspaces).map((workspace) => ({ workspace }));
}

export default async function WorkspacePage({
  params
}: {
  params: Promise<{ workspace: string }>;
}) {
  const { workspace } = await params;
  const config = contentWorkspaces[workspace];

  if (!config) {
    notFound();
  }

  return (
    <PageContainer>
      <ContentWorkspace config={config} />
    </PageContainer>
  );
}
