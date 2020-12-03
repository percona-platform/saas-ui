import React, { FC } from 'react';
import { useStyles } from '@grafana/ui';
import { LinkTo } from '../LinkTo';
import { getStyles } from './Legend.styles';

interface LinkToProps {
  name: string;
  src: string;
  state: string;
}

export const Legend: FC<LinkToProps> = ({ name, src, state }) => {
  const styles = useStyles(getStyles);

  return (
    <div className={styles.legend}>
      <div>Component: <span className={styles.component}>{name}</span><LinkTo src={src} /></div>
      <div className={styles.state}>{state}</div>
    </div>
  );
};
