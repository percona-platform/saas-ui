import React, { FC } from 'react';
import { Button, ButtonProps, Spinner } from '@grafana/ui';

interface LoaderButtonProps extends ButtonProps {
  loading?: boolean;
}

export const LoaderButton: FC<LoaderButtonProps> = ({
  children,
  className,
  disabled,
  loading = false,
  size = 'md',
  ...props
}) => (
  <Button className={className} size={size} disabled={loading || disabled} {...props}>
    {loading ? <Spinner /> : children}
  </Button>
);
