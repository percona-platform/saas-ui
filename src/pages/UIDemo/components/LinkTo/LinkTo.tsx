import React, { FC } from 'react';
import { LinkButton, useStyles } from '@grafana/ui';
import { getStyles } from '../styles';

interface LinkToProps {
  src: string;
}

const url = 'https://github.com/percona-platform/saas-ui/tree/main/packages/platform-ui/src/pages/UIDemo/components';

export const LinkTo: FC<LinkToProps> = ({ src }) => {
  const styles = useStyles(getStyles);

  return (
    <LinkButton
      href={`${url}${src}`}
      data-qa="link-to-source"
      className={styles.linkButton}
      target="_blank"
      variant="link"
    >
      [source]
    </LinkButton>
  );
};
