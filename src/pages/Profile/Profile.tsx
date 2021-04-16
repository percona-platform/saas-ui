import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { TextInputField } from '@percona/platform-core';
import { authGetProfileAction, getAuth } from 'store/auth';
import { PrivateLayout } from 'components/Layouts';
import { getStyles } from './Profile.styles';
import { Messages } from './Profile.messages';

export const ProfilePage: FC = () => {
  const styles = useStyles(getStyles);
  const dispatch = useDispatch();
  const { email, firstName, lastName } = useSelector(getAuth);

  useEffect(() => {
    dispatch(authGetProfileAction.request());
  }, [dispatch]);

  return (
    <PrivateLayout>
      <Form onSubmit={() => {}}>
        {({ handleSubmit }: FormRenderProps) => (
          <form data-qa="login-form" onSubmit={handleSubmit}>
            <legend className={styles.legend}>{Messages.profile}</legend>
            <div className={styles.nameFields}>
              <TextInputField disabled label={Messages.firstNameLabel} name="profile-first-name" value={firstName} />
              <TextInputField disabled label={Messages.lastNameLabel} name="profile-last-name" value={lastName} />
            </div>
            <div className={styles.emailField}>
              <TextInputField disabled label={Messages.emailLabel} name="profile-email" value={email} />
            </div>
          </form>
        )}
      </Form>
    </PrivateLayout>
  );
};

