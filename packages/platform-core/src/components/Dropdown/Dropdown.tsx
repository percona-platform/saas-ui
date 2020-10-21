import React, { FC, useState, useMemo, useEffect, useRef } from 'react';
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
  toggle: React.ForwardRefExoticComponent<any>;
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
      event.target instanceof Node &&
      (toggleRef.current?.contains(event.target) ||
      popperRef.current?.contains(event.target))
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
      <Toggle ref={toggleRef} onClick={handleDropdownClick} data-qa="dropdown-toggle" />

      <div
        ref={popperRef}
        style={popperStyles.popper}
        {...popperAttributes.popper}
        data-qa="dropdown-container"
      >
        {visible ? (
          <div
            className={cx(styles.dropdownMenu, className)}
            style={popperStyles.offset}
            data-qa="dropdown-menu"
          >
            {children}
          </div>
        ) : null}
      </div>
    </>
  );
});
