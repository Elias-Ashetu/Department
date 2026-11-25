
import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./GeneratedPasswordModal.module.css";

function GeneratedPasswordModal({ account, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `Name: ${account.name}
Employee ID: ${account.employeeId}
Email: ${account.email}
Username: ${account.username}
Role: ${account.role}
Temporary Password: ${account.temporaryPassword}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      alert("Unable to copy credentials.");
    }
  };

    return createPortal(
  <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.successIcon}>✓</div>

        <h2>User Created Successfully!</h2>

        <p className={styles.successMessage}>
          The new account has been created.
        </p>

        <div className={styles.accountDetails}>
          <div>
            <span>Full Name</span>
            <strong>{account.name}</strong>
          </div>

          <div>
            <span>Employee ID</span>
            <strong>{account.employeeId || "-"}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{account.email}</strong>
          </div>

          <div>
            <span>Username</span>
            <strong>{account.username}</strong>
          </div>

          <div>
            <span>Role</span>
            <strong>{account.role}</strong>
          </div>

          <div>
            <span>Account Status</span>
            <strong>
              {account.isActive ? "Active" : "Inactive"}
            </strong>
          </div>
        </div>

        <div className={styles.temporaryPassword}>
          <label>Generated Temporary Password</label>

          <div className={styles.passwordBox}>
            <input
              type="text"
              value={account.temporaryPassword}
              readOnly
            />
          </div>
        </div>

        <p className={styles.warning}>
          Copy and securely share these credentials with the newly
          created user. This temporary password will disappear
          when you close this window.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.createButton}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy Credentials"}
          </button>

          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>

      </div>
    </div>,
      document.body 
  );
}

export default GeneratedPasswordModal;
