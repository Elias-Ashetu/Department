
import styles from "./DeanDashboard.module.css";

const DeanDashboard = () => {
  return (
    <div className={styles.dashboard}>

      {/* Welcome Section */}
      <div className={styles.welcome}>
        <h1>Welcome, Dean!</h1>
        <p>
          Monitor your department's students,
          placement activities, and capacity.
        </p>
      </div>

      {/* Statistics */}
      <div className={styles.statsGrid}>

        <div className={styles.statCard}>
          <h3>Total Assigned Students</h3>
          <p>--</p>
        </div>

        <div className={styles.statCard}>
          <h3>Placed Students</h3>
          <p>--</p>
        </div>

        <div className={styles.statCard}>
          <h3>Available Seats</h3>
          <p>--</p>
        </div>

        <div className={styles.statCard}>
          <h3>Placement Progress</h3>
          <p>--%</p>
        </div>

      </div>

      {/* Recent Activities */}
      <div className={styles.activities}>
        <h2>Recent Placement Activities</h2>
        <p>No recent activities available.</p>
      </div>

    </div>
  );
};

export default DeanDashboard;