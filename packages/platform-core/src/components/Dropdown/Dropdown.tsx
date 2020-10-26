import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { Options as PopperOptions } from '@popperjs/core';
import { cx } from 'emotion';
import { useTheme } from '@grafana/ui';
import { getStyles } from './Dropdown.styles';

const popperConfig: Partial<PopperOptions> = {
  placement: 'bottom',
  modifiers: [
    {
      name: 'offset',
      enabled: true,
      options: {
        offset: [0, 10],
      },
    },
  ],
};

interface DropdownProps {
  toggle: React.ForwardRefExoticComponent<
    React.RefAttributes<any> & React.HTMLAttributes<any>
  >;
  children: Array<React.ReactElement>;
  className?: string;
}

export const Dropdown: FC<DropdownProps> = React.memo(({
  className,
  children,
  toggle: Toggle,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [visible, setVisible] = useState(false);

  const toggleRef = useRef<HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const { styles: popperStyles, attributes: popperAttributes } = usePopper(
    toggleRef.current,
    popperRef.current,
    popperConfig,
  );

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      (toggleRef.current?.contains(event.target as Node) ||
      popperRef.current?.contains(event.target as Node))
    ) {
      return;
    }

    setVisible(false);
  };

  const handleDropdownClick = () => {
    setVisible((oldValue) => !oldValue);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return (
    <>
      <Toggle ref={toggleRef} onClick={handleDropdownClick} data-qa="dropdown-menu-toggle" />

      <div
        ref={popperRef}
        style={popperStyles.popper}
        {...popperAttributes.popper}
        data-qa="dropdown-menu-container"
      >
        {visible ? (
          <div
            className={cx(styles.dropdownMenu, className)}
            style={popperStyles.offset}
            data-qa="dropdown-menu-menu"
            onClick={handleDropdownClick}
          >
            {children}
          </div>
        ) : null}
      </div>
    </>
  );
});
