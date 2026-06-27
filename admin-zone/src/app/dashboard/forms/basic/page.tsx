import PageContainer from '@admin/components/layout/page-container';
import DemoForm from '@admin/components/forms/demo-form';

export const metadata = {
  title: 'Dashboard: Basic Form'
};

export default function Page() {
  return (
    <PageContainer
      pageTitle='Basic Form'
      pageDescription='A comprehensive form demo with all field types.'
    >
      <DemoForm />
    </PageContainer>
  );
}

