import PageContainer from '@admin/components/layout/page-container';
import { buttonVariants } from '@admin/components/ui/button';
import ProductListingPage from '@admin/features/products/components/product-listing';
import { searchParamsCache } from '@admin/lib/searchparams';
import { cn } from '@admin/lib/utils';
import { Icons } from '@admin/components/icons';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { productInfoContent } from '@admin/config/infoconfig';

export const metadata = {
  title: 'Dashboard: Products'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer
      pageTitle='Products'
      pageDescription='Manage products (React Query + nuqs table pattern.)'
      infoContent={productInfoContent}
      pageHeaderAction={
        <Link href='/dashboard/product/new' className={cn(buttonVariants(), 'text-xs md:text-sm')}>
          <Icons.add className='mr-2 h-4 w-4' /> Add New
        </Link>
      }
    >
      <ProductListingPage />
    </PageContainer>
  );
}

