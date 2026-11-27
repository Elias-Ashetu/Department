import { useState } from "react";

const INITIAL_ANNOUNCEMENTS = [
  {
    id: "1",
    refCode: "WU-IOT-2026-01",
    title: "2026/27 Pre-Engineering Department Selection Period Open",
    category: "Deadline",
    date: "October 15, 2026",
    deadline: "October 25, 2026 at 11:59 PM EAT",
    issuedBy: "Admin / Registrar & Academic Office",
    sectionRef: "BR-01 & FR-15–FR-18",
    isUrgent: true,
    summary:
      "All Pre-Engineering students (251–500 cohort) at Wallaga University Institute of Technology must rank and submit their preferred engineering departments online before the closing deadline.",
    details: [
      "Students may log in and modify their ranked department preferences multiple times while the selection period is open.",
      "Once the submission deadline passes, the system automatically locks all preference forms unless an authorized administrative exception is granted.",
      "Ensure every available department is ranked in strict order of preference without duplicates.",
    ],
  },
  {
    id: "2",
    refCode: "WU-IOT-2026-02",
    title: "Dean-Approved Engineering Department Capacities Published",
    category: "Capacity",
    date: "October 14, 2026",
    issuedBy: "Office of the Dean, Institute of Technology",
    sectionRef: "BR-09, BR-10 & FR-07",
    summary:
      "Department capacity proposals submitted by Department Heads have been reviewed and formally approved by the Dean for the 2026/27 academic selection cycle.",
    details: [
      "Approved seat quotas are enforced strictly by the allocation engine; no department can exceed its Dean-approved capacity.",
      "Visit the 'Departments' page on your dashboard to view exact intake capacities for each engineering stream before finalizing your ranking.",
    ],
  },
  {
    id: "3",
    refCode: "WU-IOT-2026-03",
    title: "Department-Specific Minimum GPA & Prerequisite Requirements",
    category: "Eligibility",
    date: "October 13, 2026",
    issuedBy: "Department Heads & Academic Committee",
    sectionRef: "BR-02, FR-08 & FR-20",
    summary:
      "Each engineering department has updated its specific academic eligibility criteria and prerequisite thresholds for incoming Pre-Engineering students.",
    details: [
      "Students are only eligible for allocation to departments whose minimum GPA and prerequisite requirements they satisfy.",
      "The system automatically verifies your eligibility against department rules before evaluating your preference rank.",
    ],
  },
  {
    id: "4",
    refCode: "WU-IOT-2026-04",
    title: "Official 7 Allocation Criteria & Special Consideration Guidelines",
    category: "Policy & Criteria",
    date: "October 12, 2026",
    issuedBy: "Pre-Engineering Coordinator",
    sectionRef: "BR-03–BR-08 & Sec. 4.4.3",
    summary:
      "Student placement is processed centrally using Wallaga University's seven officially approved allocation criteria and university policy rules.",
    details: [
      "1. Student Ranked Preference Order",
      "2. Cumulative Grade Point Average (GPA)",
      "3. Developing-Region Consideration (subject to official verification)",
      "4. Affirmative Action Consideration (5-point allocation rule)",
      "5. Students with Disabilities Consideration (5-point allocation rule)",
      "6. Related Diploma or Level IV Certification (where applicable)",
      "7. Dean-Approved Department Capacity Limits",
    ],
  },
  {
    id: "5",
    refCode: "WU-IOT-2026-05",
    title: "Mandatory Pre-Allocation Academic Record & Profile Verification",
    category: "Verification",
    date: "October 11, 2026",
    issuedBy: "Registrar / Academic Office",
    sectionRef: "FR-10–FR-12 & Sec. 12.3.4",
    isUrgent: true,
    summary:
      "Students must inspect their imported GPA, student ID, and eligibility documentation on their Profile page prior to the close of preference submission.",
    details: [
      "Verify that your cumulative GPA, admission number, and any affirmative action, disability, developing-region, or Level IV credentials are accurately recorded.",
      "Report any discrepancy immediately to the Registrar/Academic Office before allocation processing begins.",
    ],
  },
  {
    id: "6",
    refCode: "WU-IOT-2026-06",
    title: "Dean Approval Workflow & Official Allocation Result Publication",
    category: "Results",
    date: "October 28, 2026",
    issuedBy: "Office of the Dean & Pre-Engineering Coordinator",
    sectionRef: "BR-12, BR-13 & FR-35–FR-37",
    summary:
      "Final department placement results are published to student accounts only after formal review and authorization by the Dean.",
    details: [
      "Track your application progress on your Student Dashboard ('Preference Submitted' → 'Under Review' → 'Allocation Pending' → 'Published').",
      "Once published, open the 'Allocation Result' page to view your officially assigned engineering department.",
    ],
  },
  {
    id: "7",
    refCode: "WU-IOT-2026-07",
    title: "Reconsideration Request Window & Official Appeal Procedure",
    category: "Reconsideration",
    date: "October 29, 2026",
    deadline: "Within 3 working days of result publication",
    issuedBy: "Selection Committee & Registrar Office",
    sectionRef: "BR-14 & FR-40–FR-43",
    summary:
      "Eligible students who identify a valid policy or record concern regarding their published department assignment may submit an online Reconsideration Request.",
    details: [
      "Submit your request with a clear written justification through the 'Reconsideration' tab on your Student Dashboard.",
      "All requests are logged with timestamps and reviewed by the authorized committee; monitor your request status online without visiting offices in person.",
    ],
  },
];

const CATEGORIES = [
  "All",
  "Deadline",
  "Capacity",
  "Eligibility",
  "Policy & Criteria",
  "Verification",
  "Results",
  "Reconsideration",
];

export default function Announcement() {
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState("1");

  const [userRole, setUserRole] = useState("Student");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Deadline");
  const [newDeadline, setNewDeadline] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newDetailLine, setNewDetailLine] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  const filteredAnnouncements = announcements.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.refCode.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    const nextNum = String(announcements.length + 1).padStart(2, "0");
    const created = {
      id: String(Date.now()),
      refCode: `WU-IOT-2026-${nextNum}`,
      title: newTitle.trim(),
      category: newCategory,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      deadline: newDeadline.trim() || undefined,
      issuedBy: "Pre-Engineering Coordinator / Admin",
      sectionRef: "Official Notice",
      isUrgent,
      summary: newSummary.trim(),
      details: newDetailLine
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };

    setAnnouncements([created, ...announcements]);
    setExpandedId(created.id);
    setNewTitle("");
    setNewDeadline("");
    setNewSummary("");
    setNewDetailLine("");
    setIsUrgent(false);
    setShowCreateModal(false);
  };

    return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-gradient-to-r from-[#8B1E24] via-[#73171C] to-[#1E3A8A] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <span>Wallaga University</span>
                <span>•</span>
                <span>Institute of Technology</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mt-1">
                Pre-Engineering Department Selection Announcements
              </h1>
              <p className="text-slate-100 text-sm mt-2 max-w-2xl">
                Official notices on selection deadlines, Dean-approved capacities,
                the 7 allocation criteria, result publication, and reconsideration
                procedures.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 self-start">
              <p className="text-[11px] uppercase tracking-wider text-amber-200 font-semibold mb-1.5">
                Active Role View
              </p>
              <div className="flex gap-1.5">
                {["Student", "Admin / Coordinator"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setUserRole(role)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      userRole === role
                        ? "bg-amber-400 text-slate-900 shadow"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/15 text-xs">
            <div className="bg-black/20 rounded-lg px-3.5 py-2.5">
              <span className="text-slate-300 block">Academic Cycle</span>
              <span className="font-bold text-white text-sm">2026 / 2027</span>
            </div>
            <div className="bg-black/20 rounded-lg px-3.5 py-2.5">
              <span className="text-slate-300 block">Selection Status</span>
              <span className="font-bold text-emerald-300 text-sm">
                Open for Ranking
              </span>
            </div>
            <div className="bg-black/20 rounded-lg px-3.5 py-2.5">
              <span className="text-slate-300 block">Active Notices</span>
              <span className="font-bold text-white text-sm">
                {announcements.length} Official Notices
              </span>
            </div>
            <div className="bg-black/20 rounded-lg px-3.5 py-2.5">
              <span className="text-slate-300 block">Allocation Policy</span>
              <span className="font-bold text-amber-300 text-sm">
                7 Approved Criteria
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by keyword or reference (e.g., GPA, Capacity, WU-IOT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B1E24]"
            />
          </div>

          {userRole === "Admin / Coordinator" && (
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#8B1E24] hover:bg-[#70161B] text-white text-sm font-semibold shadow-sm transition self-start md:self-auto"
            >
              + Post Official Announcement
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === category
                  ? "bg-[#1E3A8A] text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
            No announcements found matching your selected filter or search term.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnnouncements.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <article
                  key={item.id}
                  className={`bg-white rounded-2xl border transition shadow-sm ${
                    item.isUrgent
                      ? "border-l-4 border-l-[#8B1E24] border-slate-200"
                      : "border-slate-200"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-blue-50 text-[#1E3A8A] border border-blue-100">
                          {item.category}
                        </span>
                        {item.isUrgent && (
                          <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-red-50 text-[#8B1E24] border border-red-200">
                            Urgent Notice
                          </span>
                        )}
                        <span className="text-xs font-mono text-slate-400">
                          {item.refCode}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        Published: <strong>{item.date}</strong>
                      </span>
                    </div>

                    <h2 className="text-lg md:text-xl font-bold text-slate-900">
                      {item.title}
                    </h2>
                    <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                      {item.summary}
                    </p>

                    {item.deadline && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                        <span>Deadline / Window:</span>
                        <span>{item.deadline}</span>
                      </div>
                    )}

                    {isExpanded && item.details.length > 0 && (
                      <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Key Guidelines & Rules
                        </p>
                        <ul className="space-y-1.5 text-sm text-slate-700">
                          {item.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#8B1E24] font-bold">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                      <div>
                        Issued by:{" "}
                        <strong className="text-slate-700">{item.issuedBy}</strong>
                        <span className="mx-2 text-slate-300">|</span>
                        <span>Policy Ref: {item.sectionRef}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : item.id)
                        }
                        className="text-[#1E3A8A] hover:underline font-semibold"
                      >
                        {isExpanded ? "Hide Details ▲" : "Read Full Notice ▼"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">
              Publish New Department Selection Notice
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Authorized for Admin / Registrar Office & Pre-Engineering Coordinator
            </p>

            <form onSubmit={handleCreateAnnouncement} className="mt-4 space-y-4">
              
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#8B1E24] hover:bg-[#70161B] rounded-lg"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
