'use client';

import { FC } from 'react';

import Layout from '../layout';

import AppearanceForm from '@/components/widgets/appearance-form';
import ContentSection from '@/components/widgets/content-section';

const AppearancePage: FC = () => {
  return (
    <Layout>
      <ContentSection
        title="Appearance"
        desc="Customize the appearance of the app. Automatically switch between day and night themes."
      >
        <AppearanceForm />
      </ContentSection>
    </Layout>
  );
};

export default AppearancePage;
