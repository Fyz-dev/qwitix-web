import { FC } from 'react';

import Layout from '../layout';

import ProfileForm from './profile-form';

import ContentSection from '@/components/widgets/content-section';

const ProfilePage: FC = () => {
  return (
    <Layout>
      <ContentSection
        title="Profile"
        desc="This is how others will see you on the site."
      >
        <ProfileForm />
      </ContentSection>
    </Layout>
  );
};

export default ProfilePage;
