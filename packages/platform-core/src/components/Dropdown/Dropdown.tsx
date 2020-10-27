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
        offset: [0, 2],
      },
    },
  ],
};

interface DropdownProps {
  // TODO: improve this
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
  const size = React.Children.count(children);

  const toggleRef = useRef<HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuItems = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      ...child.props,
      onClick: () => {
        setActiveIndex(index + 1);
        child.props.onClick();
      },
      className: cx(child.props.className, { active: index === activeIndex }),
    });
  });

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
    const up = ['ArrowUp', 'ArrowLeft'];
    const down = ['ArrowDown', 'ArrowRight'];
    const handleKeyupClick = (event: KeyboardEvent) => {
      if (visible) {
        if (up.includes(event.code)) {
          setActiveIndex((currentIndex) => currentIndex === 0 ? size - 1 : currentIndex - 1);
          event.preventDefault();
        }

        if (down.includes(event.code)) {
          setActiveIndex((currentIndex) => currentIndex === size - 1 ? 0 : currentIndex + 1);
          event.preventDefault();
        }
      }
    };
    const handleKeydownClick = (event: KeyboardEvent) => {
      if (visible) {
        event.preventDefault();
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keyup', handleKeyupClick);
    document.addEventListener('keydown', handleKeydownClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keyup', handleKeyupClick);
      document.removeEventListener('keydown', handleKeydownClick);
      // UX: reset the index when we tear down the children
      setActiveIndex(-1);
    };
  }, [size, visible]);

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
            {menuItems}
          </div>
        ) : null}
      </div>
    </>
  );
});
