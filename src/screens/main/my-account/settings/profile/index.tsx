import { FC } from 'react';

import ProfileForm from '../components/profile-form';
import Layout from '../layout';

import ContentSection from '@/components/widgets/content-section';

const ProfilePage: FC = () => {
  return (
    <Layout>
      <ContentSection title="Profile" desc="Update your account settings.">
        <ProfileForm />
      </ContentSection>
    </Layout>
  );
};

export default ProfilePage;
