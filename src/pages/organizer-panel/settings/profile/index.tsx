import { FC } from 'react';

import ContentSection from '../components/content-section';

import ProfileForm from './profile-form';

const Profile: FC = () => {
  return (
    <ContentSection
      title="Profile"
      desc="This is how others will see you on the site."
    >
      <ProfileForm />
    </ContentSection>
  );
};

export default Profile;
