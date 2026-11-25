import styles from "./UserSearch.module.css";

export default function UserSearch({ search, setSearch }) {
  return (
    <div className={styles.searchBox}>
      <input
        type="search"
        placeholder="Search by name, email, or username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}