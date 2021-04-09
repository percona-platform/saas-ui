import React, { FC } from 'react';
import { useStyles } from '@grafana/ui';
import { slugify } from './Heading.utils';
import { getStyles } from './Heading.styles';

interface HeadingProps {
  title: string;
}

export const Heading: FC<HeadingProps> = ({ title }) => {
  const styles = useStyles(getStyles);
  const id = slugify(title);

  return (
    <header id={id} className={styles.heading}>
      <span>{title}</span>
    </header>
  );
};
