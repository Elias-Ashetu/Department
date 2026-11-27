
import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from './announcement.module.css';

/* Sample data: replace with your real announcements (or fetch from your API).
  type: "deadline" | "update" | "information" */
const announcements = [
  {
    id: 1,
    day: "24",
    month: "May",
    type: "deadline",
    title: "Department preference submission closes May 24",
    description:
      "All eligible Pre-Engineering students must submit and confirm their ranked preferences before 5:00 PM.",
    featured: true,
  },
  {
    id: 2,
    day: "10",
    month: "May",
    type: "update",
    title: "Approved department capacities published",
    description:
      "Final approved capacity figures for the 2024/25 academic year are now available for student review.",
  },
  {
    id: 3,
    day: "02",
    month: "May",
    type: "information",
    title: "Student orientation and selection guide",
    description:
      "Download the official guide and join the upcoming orientation session for the department selection process.",
  },
];

const FILTERS = [
  { value: "all", label: "All announcements" },
  { value: "deadline", label: "Deadlines" },
  { value: "update", label: "Updates" },
  { value: "information", label: "Information" },
];

const TYPE_LABEL = {
  deadline: "Deadline",
  update: "Update",
  information: "Information"
};

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={{ transform: open ? "rotate(-90deg)" : "none", transition: "transform .2s" }}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function AnnouncementCard({ item, onRead }) {
  return (
    <article className={`${styles['an-card']} ${item.featured ? styles['an-card--featured'] : ''}`}>
      <div className={styles['an-card__date']}>
        <span className={styles['an-card__day']}>{item.day}</span>
        <span className={styles['an-card__month']}>{item.month}</span>
      </div>

      <div className={styles['an-card__content']}>
        <span className={`${styles['an-badge']} ${styles[`an-badge--${item.type}`]}`}>
          {TYPE_LABEL[item.type]}
        </span>

        <h3 className={styles['an-card__title']}>{item.title}</h3>

        <p className={styles['an-card__desc']}>{item.description}</p>

        <button
          type="button"
          className={styles['an-card__link']}
          onClick={() => onRead?.(item)}
        >
          Read announcement <ArrowIcon />
        </button>
      </div>
    </article>
  );
}

export default function Announcements({ onReadAnnouncement }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the filter menu when clicking outside or pressing Escape
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };

    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return announcements.filter(
      (a) =>
        (filter === "all" || a.type === filter) &&
        (!q || a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q))
    );
  }, [query, filter]);

  const currentLabel = FILTERS.find((f) => f.value === filter).label;

  return (
    <div className={styles['an-page']}>

      <header className={styles['an-hero']}>
        <div className={styles.container}>
          <p className={styles['an-eyebrow']}>OFFICIAL UPDATES</p>

          <h1 className={styles['an-hero__title']}>Announcements</h1>

          <p className={styles['an-hero__text']}>
            Follow important selection deadlines, capacity updates, and placement
            notices published by Wallaga University.
          </p>
        </div>
      </header>

      <main className={styles['an-main']}>

        <div className={styles['an-toolbar']}>

          <label className={styles['an-search']}>
            <SearchIcon />

            <input
              type="search"
              placeholder="Search announcements"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search announcements"
            />
          </label>

          <div className={styles['an-filter']} ref={menuRef}>

            <button
              type="button"
              className={styles['an-filter__btn']}
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={menuOpen}
            >
              <span>{currentLabel}</span>
              <ChevronIcon open={menuOpen} />
            </button>

            {menuOpen && (
              <ul className={styles['an-filter__menu']} role="listbox">
                {FILTERS.map((f) => (
                  <li key={f.value} role="option" aria-selected={f.value === filter}>
                    <button
                      type="button"
                      className={`${styles['an-filter__option']} ${f.value === filter ? styles['is-active'] : ''}`}
                      onClick={() => {
                        setFilter(f.value);
                        setMenuOpen(false);
                      }}
                    >
                      {f.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}

          </div>
        </div>

        <div className={styles['an-list']}>

          {visible.length > 0 ? (
            visible.map((a) => (
              <AnnouncementCard
                key={a.id}
                item={a}
                onRead={onReadAnnouncement}
              />
            ))
          ) : (
            <p className={styles['an-empty']}>
              No announcements match your search. Try a different word or choose
              "All announcements".
            </p>
          )}

        </div>
      </main>
    </div>
  );
}
