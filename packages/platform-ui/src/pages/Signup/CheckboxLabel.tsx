import React, { FC } from 'react';
import { useStyles, LinkButton } from '@grafana/ui';
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from 'core/constants';
import { getStyles } from './Signup.styles';
import { Messages } from './Signup.messages';

export const CheckboxLabel: FC = () => {
  const styles = useStyles(getStyles);
  return (
    <>
      {`${Messages.agreementFirstPart} `}
      <LinkButton className={styles.link} variant="link" href={TERMS_OF_SERVICE_URL} target="_blank">
        {Messages.termsOfService}
      </LinkButton>
      {` ${Messages.agreementSecondPart} `}
      <LinkButton className={styles.link} variant="link" href={PRIVACY_POLICY_URL} target="_blank">
        {Messages.privacyPolicy}
      </LinkButton>
    </>
  );
};
