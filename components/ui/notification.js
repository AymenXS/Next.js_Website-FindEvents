import { useContext } from 'react';

import styles from './notification.module.css';
import NotificationContext from '../../store/notification-context';

function Notification({ title, message, status }) {
  const notificationCtx = useContext(NotificationContext);

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = styles.success;
  }

  if (status === 'error') {
    statusClasses = styles.error;
  }

  if (status === 'pending') {
    statusClasses = styles.pending;
  }

  const activeClasses = `${styles.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
