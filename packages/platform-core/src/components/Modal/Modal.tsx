import React, { FC, useEffect, ReactNode } from 'react';

import { IconButton, useTheme } from '@grafana/ui';
import { getStyles } from './Modal.styles';

interface ModalWindow {
  onClose: () => void;
  closeOnClickaway?: boolean;
  closeOnEscape?: boolean;
  isVisible: boolean;
  title: ReactNode | string;
}

export const Modal: FC<ModalWindow> = (props) => {
  const {
    isVisible, children, title, onClose, closeOnClickaway = true, closeOnEscape = true,
  } = props;
  const theme = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    if (closeOnEscape) {
      const escapeHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', escapeHandler);

      return () => document.removeEventListener('keydown', escapeHandler);
    }

    return undefined;
  }, [closeOnEscape]);

  return isVisible ? (
    <div data-qa="modal-wrapper">
      <div
        className={styles.background}
        onClick={closeOnClickaway ? onClose : undefined}
        data-qa="modal-background"
      />
      <div className={styles.body} data-qa="modal-body">
        <div className={styles.modalHeader} data-qa="modal-header">
          {title}
          <div className={styles.modalHeaderClose}>
            <IconButton
              surface="header"
              data-qa="modal-close-button"
              name="times"
              size="lg"
              onClick={onClose}
            />
          </div>
        </div>
        <div className={styles.content} data-qa="modal-content">
          {children}
        </div>
      </div>
    </div>
  ) : null;
};
