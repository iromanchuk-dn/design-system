import React from 'react';
import classNames from 'classnames';
import styles from './ds-text-field.module.scss';
import { DsTextFieldProps } from './ds-text-field.types';
import { DsIcon } from '../ds-icon';

/**
 * Design system TextField component
 */
const DsTextField: React.FC<DsTextFieldProps> = ({
  id,
  schema = 'info',
  label,
  required = false,
  disabled,
  icon,
  message,
  messageIcon = <DsIcon name="info" size="small" />,
  className,
  ...props
}) => {
  const inputId = id || React.useId();

  return (
    <div className={classNames(styles.container, styles[schema])}>
      <label
        htmlFor={inputId}
        className={classNames(styles.label, {
          [styles.required]: required,
          [styles.disabled]: disabled,
        })}
      >
        {label}
      </label>

      <div className={styles.inputWrapper}>
        {icon && <DsIcon className={styles.icon} name={icon} size="medium" />}
        <input
          id={inputId}
          className={classNames(styles.input, className, {
            [styles.withIcon]: icon,
          })}
          disabled={disabled}
          {...props}
        />
      </div>

      {message && (
        <div className={styles.message}>
          {messageIcon}
          <span className={styles.messageText}>{message}</span>
        </div>
      )}
    </div>
  );
};

export default DsTextField;
