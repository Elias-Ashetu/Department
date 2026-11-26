import React, { useState } from "react";

interface Announcement {
  id: string;
  title: string;
  category: "Deadline" | "Policy & Criteria" | "Capacity" | "Results";
  date: string;
  author: string;
  summary: string;
  details: string[];
  isUrgent?: boolean;
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ANN-2026-01",
    title: "2026/27 Pre-Engineering Department Selection Period Open",
    category: "Deadline",
    date: "October 15, 2026",
    author: "Admin / Registrar & Academic Office",
    isUrgent: true,
    summary:
      "All Pre-Engineering students at Wallaga University Institute of Technology must submit and rank their preferred engineering departments before the closing deadline.",
    details: [
      "Submission Window: October 15, 2026 – October 25, 2026 (11:59 PM EAT).",
      "Students may modify their ranked preferences multiple times before the deadline.",
      "Once the deadline passes, the system will automatically lock submissions unless an authorized administrative exception is granted.",
    ],
  },
  {
    id: "ANN-2026-02",
    title: "Official 7 Allocation Criteria & Eligibility Guidelines",
    category: "Policy & Criteria",
    date: "October 12, 2026",
    author: "Pre-Engineering Coordinator",
    summary:
      "Student placement will be processed centrally using Wallaga University's seven officially approved allocation considerations.",
    details: [
      "1. Ranked Student Preference Order",
      "2. Cumulative Grade Point Average (GPA)",
      "3. Developing-Region Consideration (subject to verification)",
      "4. Affirmative Action Consideration (5-point allocation rule)",
      "5. Students with Disabilities Consideration (5-point allocation rule)",
      "6. Related Diploma or Level IV Certification (where applicable)",
      "7. Dean-Approved Department Capacity Limits",
    ],
  },
  {
    id: "ANN-2026-03",
    title: "Approved Engineering Department Capacities Published",
    category: "Capacity",
    date: "October 10, 2026",
    author: "Office of the Dean, Institute of Technology",
    summary:
      "Department capacity proposals submitted by Department Heads have been reviewed and approved by the Dean for the current selection cycle.",
    details: [
      "Review each department's specific minimum GPA and prerequisite requirements on the Departments page before ranking.",
      "No department will exceed its Dean-approved intake quota during allocation.",
    ],
  },
  {
    id: "ANN-2026-04",
    title: "Result Publication & Reconsideration Request Procedure",
    category: "Results",
    date: "October 28, 2026",
    author: "Pre-Engineering Coordinator & Committee",
    summary:
      "Final placement results will only become visible on your Student Dashboard after formal review and approval by the Dean.",
    details: [
      "Check your 'Allocation Result' tab once the status changes from 'Allocation Pending' to 'Published'.",
      "Eligible students with valid concerns may submit an online Reconsideration Request within 3 working days of result publication.",
    ],
  },
];

export default function AnnouncementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Deadline", "Policy & Criteria", "Capacity", "Results"];

  const filteredAnnouncements = ANNOUNCEMENTS.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Banner */}
      <header className="bg-blue-900 text-white py-10 px-6 shadow-md">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-wider text-blue-200 font-semibold">
            Wallaga University • Institute of Technology
          </p>
          <h1 className="text-3xl font-bold mt-1">
            Department Selection Announcements & Notices
          </h1>
          <p className="text-blue-100 mt-2 max-w-2xl text-sm">
            Official updates regarding selection deadlines, Dean-approved department
            capacities, allocation criteria, and final placement publication.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-8 px-6">
        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-blue-800 text-white shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 w-full md:w-64"
          />
        </div>

        {/* Announcements List */}
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
            No announcements match your filter or search query.
          </div>
        ) : (
          <div className="space-y-5">
            {filteredAnnouncements.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                    {item.isUrgent && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                        Important Notice
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">Posted: {item.date}</span>
                </div>

                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  {item.title}
                </h2>
                <p className="text-slate-600 text-sm mb-4">{item.summary}</p>

                <ul className="bg-slate-50 rounded-lg p-4 space-y-1.5 text-sm text-slate-700 border border-slate-100">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-700 font-bold">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                  <span>
                    Issued by: <strong>{item.author}</strong>
                  </span>
                  <span>Ref: {item.id}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
