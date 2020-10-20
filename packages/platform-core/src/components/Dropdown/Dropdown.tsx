import React, { FC, useState, useEffect, useMemo, useRef } from 'react';
import { usePopper } from 'react-popper';
import { Options as PopperOptions } from '@popperjs/core';
import { cx } from 'emotion';
import { useTheme } from '@grafana/ui';
import { getStyles } from './NumberInput.styles';

const popperConfig: Partial<PopperOptions> = {
  placement: 'bottom',
  modifiers: [
    {
      name: 'offset',
      enabled: true,
      options: {
        offset: [0, 0],
      },
    },
  ],
};

const DropdownItem: FC = ({ children }) => {
  const styles = useMemo(() => getStyles(), []);

  return <div className={styles.dropdownItem}>{children}</div>;
};

interface DropdownProps {
  toggle:
    | React.ComponentType<any>
    | React.LazyExoticComponent<React.ComponentType<any>>;
  children: Array<typeof DropdownItem>;
}

const Dropdown: FC<DropdownProps> = ({ children, toggle: Toggle }) => {
  const [visible, setVisible] = useState(false);

  const toggleRef = useRef<HTMLSpanElement>(null);
  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(
    toggleRef.current,
    popperRef.current,
    popperConfig,
  );

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      event.target instanceof Node &&
      toggleRef.current?.contains(event.target)
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
      <div ref={popperRef} style={styles.popper} {...attributes.popper}>
        <Toggle ref={toggleRef} onClick={handleDropdownClick} />

        {visible ?
          <div style={styles.offset}>
            {children}
          </div>
        : null}
      </div>
    </>
  );
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const MyToggle = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <button type="button" ref={ref} {...props}>
      Toggle
    </button>
  ),
);

export default () => (
  <>
    <Dropdown toggle={MyToggle}>
      <DropdownItem>test</DropdownItem>
      <DropdownItem>test</DropdownItem>
    </Dropdown>
  </>
);
