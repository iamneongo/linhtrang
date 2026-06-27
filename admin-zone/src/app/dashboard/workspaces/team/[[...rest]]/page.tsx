'use client';

import PageContainer from '@admin/components/layout/page-container';
import { OrganizationProfile } from '@clerk/nextjs';
import { teamInfoContent } from '@admin/config/infoconfig';

export default function TeamPage() {
  return (
    <PageContainer
      pageTitle='Team Management'
      pageDescription='Manage your workspace team, members, roles, security and more.'
      infoContent={teamInfoContent}
    >
      <OrganizationProfile />
    </PageContainer>
  );
}

