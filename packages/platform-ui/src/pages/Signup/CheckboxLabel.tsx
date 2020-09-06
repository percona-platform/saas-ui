import React, { FC } from 'react';
import { useTheme } from '@grafana/ui';
import { LinkButton } from '@grafana/ui';
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from 'core';
import { getStyles } from './Signup.styles';
import { Messages } from './Signup.messages';

export const CheckboxLabel: FC = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <>
      {`${Messages.agreementFirstPart} `}
      <LinkButton className={styles.link} variant="link" href={TERMS_OF_SERVICE_URL}>
        {Messages.termsOfService}
      </LinkButton>
      {` ${Messages.agreementSecondPart} `}
      <LinkButton className={styles.link} variant="link" href={PRIVACY_POLICY_URL}>
        {Messages.privacyPolicy}
      </LinkButton>
    </>
  );
};
