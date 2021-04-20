import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { LoaderButton, TextInputField } from '@percona/platform-core';
import { authGetProfileAction, authUpdateProfileAction, getAuth } from 'store/auth';
import { UpdateProfilePayload } from 'store/types';
import { PrivateLayout } from 'components/Layouts';
import { getStyles } from './Profile.styles';
import { Messages } from './Profile.messages';

export const ProfilePage: FC = () => {
  const styles = useStyles(getStyles);
  const dispatch = useDispatch();
  const { pending, email, firstName, lastName } = useSelector(getAuth);

  useEffect(() => {
    dispatch(authGetProfileAction.request());
  }, [dispatch]);

  const handleUpdateProfileSubmit = useCallback(
    ({ firstName: newFirstName, lastName: newLastName }: UpdateProfilePayload) => {
      dispatch(authUpdateProfileAction.request({ firstName: newFirstName, lastName: newLastName }));
    },
    [dispatch],
  );

  return (
    <PrivateLayout>
      <main className={styles.wrapper}>
        <Form initialValues={{ email, firstName, lastName }} onSubmit={handleUpdateProfileSubmit}>
          {({ handleSubmit, valid, pristine }: FormRenderProps) => (
            <form data-qa="login-form" className={styles.form} onSubmit={handleSubmit}>
              <legend className={styles.legend}>{Messages.profile}</legend>
              <div className={styles.nameFields}>
                <TextInputField label={Messages.firstNameLabel} name="firstName" />
                <TextInputField label={Messages.lastNameLabel} name="lastName" />
              </div>
              <TextInputField disabled label={Messages.emailLabel} name="email" />
              <div className={styles.buttonWrapper}>
                <LoaderButton loading={pending} data-qa="profile-submit-button" type="submit" disabled={!valid || pending || pristine}
                >Save</LoaderButton>
              </div>
            </form>
          )}
        </Form>
      </main>
    </PrivateLayout>
  );
};

