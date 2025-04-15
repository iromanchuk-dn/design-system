import React from 'react';
import classNames from 'classnames';
import styles from './ds-text-area.module.scss';
import { DsTextareaProps } from './ds-text-area.types';
import { DsIcon } from '../ds-icon';

/**
 * Design system Textarea component
 */
const DsTextarea: React.FC<DsTextareaProps> = ({
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
  const textareaId = id || React.useId();

  return (
    <div className={classNames(styles.container, styles[schema])}>
      <label
        htmlFor={textareaId}
        className={classNames(styles.label, {
          [styles.required]: required,
          [styles.disabled]: disabled,
        })}
      >
        {label}
      </label>

      <div className={styles.textareaWrapper}>
        {icon && <DsIcon className={styles.icon} name={icon} size="medium" />}
        <textarea
          id={textareaId}
          className={classNames(styles.textarea, className, {
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

export default DsTextarea;
