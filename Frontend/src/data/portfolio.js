// ── Portfolio Data ──
// Central data store for the entire portfolio. Edit this file to update content.

export const personalInfo = {
  name: "Kishan Parvadiya",
  role: "UI/UX Designer | Aspiring Product Manager",
  tagline: "Crafting digital experiences that inspire.",
  bio: `Aspiring Product Manager with a strong foundation in user-centered design and a Bachelor's in Computer Science in progress. Certified Scrum Master skilled in Agile practices, product road mapping, and translating user needs into tangible product features. Combines hands-on experience in Figma prototyping and design systems with a passion for managing the entire product lifecycle to deliver impactful digital solutions that align with business objectives.`,
  email: "kishanpatel486630@gmail.com",
  location: "Vadodara, Gujarat, India",
  phone: "9328797998",
  profileImage: "/images/profile.jpg",
  social: {
    dribbble: "https://dribbble.com/kishanparvadiya",
    behance: "https://behance.net/kishanparvadiya",
    linkedin: "https://linkedin.com/in/kishan-parvadiya-593120268",
    github: "https://github.com/kishanpatel486630",
    twitter: "https://twitter.com/kishanparvadiya",
  },
  resumeUrl:
    "https://drive.google.com/file/d/1o6AZr9irkFMHJ-xepU5FIXD385b22t2w/view?usp=sharing",
};

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const clientLogos = [
  { name: "Google", text: "Google" },
  { name: "Microsoft", text: "Microsoft" },
  { name: "Adobe", text: "Adobe" },
  { name: "Figma", text: "Figma" },
  { name: "Spotify", text: "Spotify" },
  { name: "Slack", text: "Slack" },
  { name: "Stripe", text: "Stripe" },
  { name: "Notion", text: "Notion" },
];

export const projectFilters = ["All", "Designer", "Manager"];

export const projects = [
  {
    id: "nubiabarking",
    title: "Nubia Parking",
    category: "Smart Parking Management System",
    description:
      "Nubia Parking is a smart mobile-based parking management system built to help security personnel manage vehicle entries, track slot availability, and monitor daily cash flow in real time.",
    image: "/images/nubia-parking-screens.png",
    images: ["/images/nubia-parking-screens.png"],
    tags: ["Mobile App", "Parking", "Operations"],
    year: "2025",
    client: "Internal",
    hasCaseStudy: true,
    role: "Designer",
    projectUrl: "https://dribbble.com/kishanparvadiya",
  },
  {
    id: "evmcare",
    title: "WorkHub",
    category: "Co-Working Space Booking App",
    description:
      "WorkHub is a mobile-first co-working space booking platform that allows users to discover, explore, and book workspaces such as private cabins, meeting rooms, and shared desks seamlessly.",
    image: "/images/workhub-coworking.png",
    images: ["/images/workhub-coworking.png"],
    tags: ["Booking", "Co-Working", "Mobile App"],
    year: "2024",
    client: "WorkHub",
    hasCaseStudy: true,
    role: "Manager",
    projectUrl: "https://behance.net/kishanparvadiya",
  },
  {
    id: "leadmgmt",
    title: "Lead Management",
    category: "Lead Management System - LeadSystem CRM",
    description:
      "LeadSystem CRM is a mobile and web dashboard based customer relationship and lead management platform designed to help businesses track leads, manage interactions, and streamline sales workflows in one unified system.",
    image: "/images/leadsystem-crm-screens.png",
    images: [
      "/images/leadsystem-crm-screens.png",
      "/images/lead-crm-dashboard.png",
    ],
    tags: ["CRM", "Lead Management", "Mobile App"],
    year: "2024",
    client: "Corporate",
    hasCaseStudy: true,
    role: "Designer",
    projectUrl: "https://github.com/kishanpatel486630",
  },
  {
    id: "adrinoling",
    title: "Adrenalinq",
    category: "Tournament Management Ecosystem",
    description:
      "Adrenalinq is a comprehensive sports tournament management ecosystem for local communities and organizers, streamlining registration, live match tracking, and player auctions across mobile apps and web dashboards.",
    image: "/images/adrinoling-tournament.png",
    images: ["/images/adrinoling-tournament.png"],
    tags: ["Sports", "Tournament", "Ecosystem"],
    year: "2025",
    client: "Adrenalinq",
    hasCaseStudy: true,
    role: "Manager",
    projectUrl: "https://behance.net/kishanparvadiya",
  },
  {
    id: "rkcredit",
    title: "RK Credit First",
    category: "Credit Card Management App",
    description:
      "RK Credit First is a mobile-first financial platform that simplifies how users explore, apply for, and manage multiple credit cards in one unified ecosystem.",
    image: "/images/rk-credit-first.png",
    images: ["/images/rk-credit-first.png"],
    tags: ["Fintech", "Credit Cards", "Mobile App"],
    year: "2024",
    client: "RK Bank",
    hasCaseStudy: true,
    role: "Designer",
    projectUrl: "https://dribbble.com/kishanparvadiya",
  },
];

export const caseStudies = {
  nubiabarking: {
    id: "nubiabarking",
    title: "Nubia Parking - Smart Parking Management System",
    subtitle:
      "A mobile-based system for real-time vehicle entry, slot tracking, and cash flow monitoring",
    overview: `Nubia Parking is a smart mobile-based parking management system built to help security personnel manage vehicle entries, track slot availability, and monitor daily cash flow in real time. The product targets parking operations staff who need a fast, reliable tool to replace manual registers and paper-based logs.`,
    role: "Product Designer (UI/UX Designer)",
    timeline: "4-6 weeks",
    team: "1 Product Designer (Me), 1 Flutter Developer, 1 Backend Developer",
    tools: [
      "Figma (UI/UX Design & Prototyping)",
      "User Flow Mapping",
      "Wireframing",
    ],
    sections: [
      {
        title: "Role & Responsibilities",
        content: `As Product Designer, I led the complete design process from discovery to handoff.
                  • Conducted stakeholder interviews with parking facility operators
                  • Defined user flows for vehicle entry, slot tracking, and cash collection
                  • Designed all mobile UI screens and interactive prototypes
                  • Collaborated with Flutter developer for implementation`,
      },
      {
        title: "The Problem",
        content: `Parking facilities rely on manual processes that are error-prone and slow.
                  • Vehicle entries recorded on paper ledgers
                  • No real-time slot availability visibility
                  • Cash collection tracked manually
                  • Difficult to audit end-of-day reports
                  • Security personnel lack a unified management tool`,
      },
      {
        title: "Research & Discovery",
        content: `I analyzed parking facility workflows and interviewed security personnel.
                  • Staff need quick vehicle entry logging
                  • Real-time slot status is critical during peak hours
                  • Cash reconciliation is done at end of each shift
                  • Mobile-first approach preferred over desktop
                  • Minimal training time is essential for adoption`,
      },
      {
        title: "Design Process",
        content: `The core flow was designed as Login → Dashboard → Vehicle Entry → Slot View → Cash Summary.
                  • Final UI Screens: 8
                  • Clean dark-mode interface optimized for low-light parking environments
                  • Quick entry form with plate number input and slot assignment
                  • Live slot grid showing occupied and available spaces
                  • Daily cash flow summary with entry count and revenue
                  • Prototyped complete shift workflow from entry to end-of-day report`,
      },
      {
        title: "Core Features",
        content: `The app covers all critical parking operations in one interface.
                  • Vehicle Entry Logging: quick plate number and slot assignment
                  • Live Slot Map: visual grid of occupied vs. available slots
                  • Cash Flow Dashboard: real-time revenue and entry count
                  • Daily Reports: shift summary for audit and reconciliation
                  • Search & Filter: find vehicle records quickly`,
      },
      {
        title: "Results",
        content: `The system significantly improved operational efficiency for parking staff.
                  • Entry Logging Speed: 50% Faster
                  • Errors in Records: Reduced
                  • Cash Reconciliation: Simplified
                  • Slot Visibility: Real-time
                  • Staff Adoption: High`,
      },
      {
        title: "Learnings",
        content: `Operational tools succeed when they reduce cognitive load and match existing workflows.
                  • Speed is the #1 priority for operations staff tools
                  • Dark-mode UI works better in low-light parking environments
                  • Minimal fields and quick actions drive adoption
                  • Visual slot maps are more effective than list views`,
      },
    ],
  },
  evmcare: {
    id: "evmcare",
    title: "WorkHub - Co-Working Space Booking App",
    subtitle:
      "A mobile-first platform for discovering and booking workspaces in minutes",
    overview: `WorkHub is a mobile-first co-working space booking platform that allows users to discover, explore, and book workspaces such as private cabins, meeting rooms, and shared desks seamlessly. The product focused on reducing booking friction and improving decision-making through clear visual information.`,
    role: "Product designer & Product manager",
    timeline: "6-8 weeks",
    team: "1 Product Designer (Me - Project Lead), 1 Flutter Developer, 1 Backend Developer",
    tools: [
      "Figma (UI/UX Design & Prototyping)",
      "User Research",
      "Wireframing",
    ],
    sections: [
      {
        title: "Role & Responsibilities",
        content: `As Product Designer (Lead), I owned the complete design process from discovery to validation.
                  • Led end-to-end product design
                  • Defined user experience strategy and booking flow
                  • Designed UI and interactive prototypes
                  • Collaborated closely with Flutter and backend developers for implementation`,
      },
      {
        title: "The Problem",
        content: `Finding and booking co-working spaces is often fragmented and inconvenient.
                  • No centralized platform to explore nearby workspaces
                  • Difficulty comparing amenities and pricing
                  • Complex booking process
                  • Lack of real-time availability
                  • Poor mobile experience in existing platforms`,
      },
      {
        title: "Research & Discovery",
        content: `I analyzed co-working platforms and user booking behavior.
                  • Users prefer quick search and booking under 1 minute
                  • Location-based discovery is essential
                  • Users want clear space types: Cabin, Meeting Room, Desk
                  • Ratings and reviews strongly influence decisions
                  • Simple UI increases booking conversion`,
      },
      {
        title: "Design Process",
        content: `The booking flow was designed as Home -> Search -> Space Detail -> Select Space -> Book, with a focus on reducing steps.
                  • Final UI Screens: 10
                  • Clean light-theme interface with strong orange CTAs
                  • Smart search with category shortcuts for Space, Meet, and Cabin
                  • Visual listing cards with image, ratings, location, and capacity
                  • Detailed view with amenities, description, and pricing transparency
                  • Seamless booking with space type selection and clear confirmation CTA
                  • Prototyped end-to-end flow from discovery to booking confirmation`,
      },
      {
        title: "Core Features",
        content: `The final product supports fast and informed workspace booking.
                  • Smart Search: find spaces based on location
                  • Workspace Listing: visual cards with ratings and details
                  • Detailed View: amenities, pricing, and description
                  • Space Selection: choose workspace type easily
                  • Booking System: quick and seamless booking flow`,
      },
      {
        title: "Results",
        content: `The redesign improved speed, engagement, and conversion in booking journeys.
                  • Booking Speed: 60% Faster
                  • User Engagement: Increased
                  • Conversion Rate: Improved
                  • Usability: High
                  • Decision-Making: Better with clearer information`,
      },
      {
        title: "Learnings",
        content: `Booking products perform best when users can evaluate and act quickly.
                  • Visual content drives user decisions
                  • Clear CTAs improve conversion
                  • Simplicity in booking flow is critical
                  • Categorization improves discoverability`,
      },
    ],
  },
  leadmgmt: {
    id: "leadmgmt",
    title: "Lead Management System - LeadSystem CRM",
    subtitle:
      "A mobile and web dashboard platform for lead tracking, follow-ups, and sales workflow management",
    overview: `LeadSystem CRM is a mobile and web dashboard based customer relationship and lead management platform designed to help businesses track leads, manage customer interactions, and streamline sales workflows in one unified system.`,
    role: "Product designer & Product manager",
    timeline: "6-8 weeks",
    team: "1 Product Designer (Me - Product Lead), 1 Flutter Developer, 1 Angular Developer, 1 Backend Developer",
    tools: [
      "Figma (UI/UX Design & Prototyping)",
      "User Research",
      "Wireframing",
    ],
    sections: [
      {
        title: "Role & Responsibilities",
        content: `As Product designer & Product manager, I drove direction and execution end-to-end.
                  • Led end-to-end product design from research to handoff
                  • Defined UX strategy and user flows for mobile and web dashboard
                  • Designed UI system and interactive prototypes
                  • Coordinated scope and priorities with Flutter, Angular, and backend teams`,
      },
      {
        title: "The Problem",
        content: `Businesses struggle to manage leads efficiently due to scattered tools and lack of structured tracking.
                  • Leads are stored across spreadsheets and multiple platforms
                  • No centralized system to track lead status
                  • Difficulty managing follow-ups
                  • Poor visibility of the sales pipeline
                  • Time-consuming manual data entry`,
      },
      {
        title: "Research & Discovery",
        content: `I analyzed small-business workflows and existing CRM usage patterns.
                  • Users prefer mobile-first CRM access
                  • Quick lead updates are critical for sales teams
                  • Follow-up reminders are essential
                  • Visual dashboards improve decision-making
                  • Simple UI is preferred over complex enterprise tools`,
      },
      {
        title: "Design Process",
        content: `The core flow was designed as Login -> Dashboard -> Leads -> Lead Details -> Follow-up to reduce friction in daily sales tasks.
                  • Final UI Screens: 7
                  • Dashboard analytics cards for Active Leads, Customer Count, and Orders
                  • Lead list in a clean card layout with quick access to call, email, and details
                  • Smart search and filters for quick lead lookup
                  • Floating action button for fast lead creation
                  • Lead detail view with customer info, services/pricing, and follow-up date
                  • Prototyped flows for add lead, update status, and follow-up tracking`,
      },
      {
        title: "Core Features",
        content: `The final product covered key sales operations across mobile and dashboard experiences.
                  • Lead Tracking: add, edit, and manage leads in an organized list
                  • Quick Actions: call and email directly from app
                  • Follow-Up Management: track next follow-up dates to improve conversion
                  • Dashboard Analytics: performance overview for leads and activity
                  • Add Lead: fast entry with minimal required fields`,
      },
      {
        title: "Results",
        content: `The redesign improved consistency, speed, and visibility for business teams.
                  • Lead Tracking Speed: 40% Faster
                  • Follow-up Efficiency: Improved
                  • Data Organization: Centralized
                  • User Experience: Simplified
                  • Pipeline Visibility: Better
                  • Manual Dependency: Reduced`,
      },
      {
        title: "Learnings",
        content: `Business tools perform best when clarity and speed are prioritized.
                  • Simplicity is key for day-to-day business workflows
                  • Quick actions like call and email improve usability
                  • Visual dashboards help users make faster decisions
                  • Reducing steps increases productivity`,
      },
    ],
  },
  adrinoling: {
    id: "adrinoling",
    title: "Adrenalinq - Sports Tournament Management Ecosystem",
    subtitle:
      "A multi-role ecosystem with mobile apps and web dashboards for end-to-end tournament operations",
    overview: `Adrenalinq is a comprehensive sports tournament management ecosystem designed for local communities and organizers. It streamlines the complete tournament lifecycle, from player registration to live match tracking and player auctions, across multiple platforms and user roles.`,
    role: "Product designer & Product manager (Project Lead)",
    timeline: "8-10 weeks",
    team: "1 Product Designer (Me - Project Lead), 2 Flutter Developers, 3 Backend Developers, 2 Angular Developers, 5 Testers",
    tools: [
      "Figma (UI/UX + Design System)",
      "Prototyping",
      "User Flow Mapping",
    ],
    sections: [
      {
        title: "Platform Breakdown",
        content: `The ecosystem includes 3 mobile apps and web dashboards for complete operational coverage.
                  • Player App: discover tournaments, register, and track matches
                  • Organizer App: create tournaments, manage registrations, and schedule matches
                  • Owner App: bid on players, build teams, and manage budgets
                  • Web Platforms: Admin Panel for full control and Organizer Dashboard for analytics and operations`,
      },
      {
        title: "The Problem",
        content: `Local sports tournaments are often managed manually or through disconnected tools.
                  • No unified system for players, organizers, and owners
                  • Manual registration and scheduling
                  • Lack of transparency in player selection and auctions
                  • Poor communication between stakeholders
                  • No real-time updates for matches`,
      },
      {
        title: "Research & Discovery",
        content: `I studied local tournament workflows and user behaviors.
                  • Players want easy discovery and quick registration
                  • Organizers need centralized control dashboards
                  • Owners require transparent auction systems
                  • Mobile-first approach is critical
                  • Real-time updates increase engagement`,
      },
      {
        title: "Design Process",
        content: `I designed a role-based ecosystem instead of a single app, creating focused experiences per user type.
                  • Final UI Screens: 6
                  • Separated journeys for player, organizer, and auction workflows
                  • Visual-first strategy with card-based tournament listings
                  • Simplified bottom navigation for Discover, Matches, and Profile
                  • Live feedback indicators for registrations and matches
                  • Action-driven CTAs like Register Now and View Details`,
      },
      {
        title: "Core Features",
        content: `The ecosystem supports tournament operations end-to-end.
                  • Player App: tournament discovery, registration, and match tracking
                  • Organizer App: tournament creation, player management, and scheduling
                  • Owner App: player auction system, budget tracking, and team building
                  • Admin and Web Dashboards: system control, analytics, and monitoring`,
      },
      {
        title: "Results",
        content: `The product improved speed, transparency, and multi-role coordination.
                  • Setup Time: 45% Faster
                  • Engagement: Increased
                  • Transparency: High
                  • Efficiency: Improved
                  • Coordination: Better across players, organizers, and owners`,
      },
      {
        title: "Learnings",
        content: `Complex ecosystems succeed when each role has clear and focused workflows.
                  • Multi-role systems need strict flow separation
                  • Simplicity is crucial even in complex products
                  • Real-time updates significantly improve engagement
                  • Different user types require different UX strategies`,
      },
    ],
  },
  rkcredit: {
    id: "rkcredit",
    title: "RK Credit First - Credit Card Management App",
    subtitle:
      "A mobile-first platform to discover, apply for, and manage multiple credit cards in one place",
    overview: `RK Credit First is a mobile-first financial platform that simplifies how users explore, apply for, and manage multiple credit cards in one unified ecosystem. The app improves financial visibility, streamlines application processes, and gives users better control over credit-related activities.`,
    role: "Product Designer (UI/UX Designer)",
    timeline: "6-8 weeks",
    team: "1 Product Designer (Me), 2 Flutter Developers, 1 Backend Developer",
    tools: [
      "Figma (UI/UX Design & Prototyping)",
      "User Flow Mapping",
      "Design System",
    ],
    sections: [
      {
        title: "Role & Responsibilities",
        content: `As Product Designer (UI/UX Designer), I drove the user experience from concept to implementation.
                  • Designed end-to-end user experience
                  • Created UI screens and interactive prototypes
                  • Collaborated with developers during implementation`,
      },
      {
        title: "The Problem",
        content: `Users struggle to manage multiple credit cards due to fragmented banking apps and lack of centralized control.
                  • Managing multiple cards across different apps
                  • Limited visibility of credit usage and limits
                  • Complicated application processes
                  • Lack of quick access to financial tools
                  • Poor user experience in traditional banking apps`,
      },
      {
        title: "Research & Discovery",
        content: `I analyzed fintech apps and user behavior patterns.
                  • Users prefer a single platform for all credit cards
                  • Fast application process improves conversion
                  • Visual dashboards help users understand finances
                  • Users value rewards, offers, and cashback visibility
                  • Trust and simplicity are critical in fintech apps`,
      },
      {
        title: "Design Process",
        content: `The user flow was designed as Home -> Explore Cards -> View Details -> Apply -> Track Status.
                  • Final UI Screens: 7
                  • Clean financial dashboard for apply and status actions
                  • Scrollable card discovery list with clear CTAs
                  • Realistic card UI and bank branding for trust
                  • Quick actions for apply, status, and future loan inquiry
                  • Engagement modules for Refer and Earn and cashback highlights
                  • Prototyped apply, confirmation, status tracking, and offers exploration`,
      },
      {
        title: "Core Features",
        content: `The app focuses on fast credit-card exploration and management.
                  • Credit Card Discovery: explore and compare multiple bank cards
                  • Easy Application Flow: simple and fast application process
                  • Application Tracking: view real-time application status
                  • Rewards and Offers: cashback and referral benefits
                  • Financial Insights (Future Scope): credit score tracking and spending analysis`,
      },
      {
        title: "Results",
        content: `The redesign improved speed, engagement, and financial clarity.
                  • Application Speed: 35% Faster
                  • User Engagement: Increased
                  • Conversion Rate: Improved
                  • Usability: Enhanced
                  • Discovery Experience: Improved
                  • Financial Awareness: Better`,
      },
      {
        title: "Learnings",
        content: `Fintech products need high trust, clarity, and action-focused flows.
                  • Trust-driven design is crucial in fintech
                  • Clear CTAs improve conversion rates
                  • Visual representation simplifies complex data
                  • Minimal UI reduces cognitive load`,
      },
    ],
  },
};

export const skills = [
  {
    category: "UI/UX Design",
    items: [
      { name: "Wireframing", level: 95 },
      { name: "Prototyping", level: 94 },
      { name: "Visual Design", level: 92 },
      { name: "Design Systems", level: 90 },
      { name: "User Research", level: 88 },
    ],
  },
  {
    category: "Product Management",
    items: [
      { name: "Agile & Scrum", level: 95 },
      { name: "Backlog Management", level: 92 },
      { name: "Product Lifecycle", level: 90 },
      { name: "Stakeholder Mgmt", level: 88 },
      { name: "Product Roadmapping", level: 85 },
    ],
  },
  {
    category: "Tools & Software",
    items: [
      { name: "Figma", level: 96 },
      { name: "FigJam & Miro", level: 90 },
      { name: "Canva", level: 85 },
      { name: "Adobe XD", level: 80 },
      { name: "Sketch", level: 75 },
    ],
  },
  {
    category: "Technical & Analytical",
    items: [
      { name: "Problem Solving", level: 95 },
      { name: "Design Thinking", level: 92 },
      { name: "UX Research Analysis", level: 88 },
      { name: "Data Interpretation", level: 80 },
      { name: "A/B Testing", level: 75 },
    ],
  },
  {
    category: "Soft Skills",
    items: [
      { name: "Attention to Detail", level: 95 },
      { name: "Communication", level: 94 },
      { name: "Collaboration", level: 92 },
      { name: "Critical Thinking", level: 90 },
      { name: "Time Management", level: 88 },
    ],
  },
  {
    category: "Bonus Skills",
    items: [
      { name: "Responsive Design", level: 92 },
      { name: "Mobile-First Design", level: 90 },
      { name: "Accessibility (WCAG)", level: 85 },
      { name: "UX Writing", level: 80 },
      { name: "Basic HTML/CSS", level: 70 },
    ],
  },
];

export const experience = [
  {
    title: "Product Designer",
    company: "Novus Ark",
    location: "Vadodara, Gujarat",
    period: "Jul 2025 — Present",
    description:
      "Partnered with clients and cross-functional teams to gather requirements, translating business objectives into intuitive product designs for web and mobile platforms.",
    highlights: [
      "Managed the product design lifecycle from user research to high-fidelity prototypes",
      "Championed user-centric principles to enhance usability and drive engagement",
      "Ensured final designs were accessible, scalable, and met client goals",
    ],
  },
  {
    title: "UI/UX Design Intern",
    company: "Novus Ark",
    location: "Vadodara, Gujarat",
    period: "Jan 2025 — Jul 2025",
    description:
      "Collaborated with design and development teams to define user flows and create user-friendly interfaces for web and mobile applications.",
    highlights: [
      "Gained hands-on experience in research, wireframing, and Figma prototyping",
      "Applied responsive design principles for seamless product experiences",
      "Contributed to scalable design systems ensuring visual consistency",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    field: "Computer Science",
    institution: "ITM(SLS) BARODA UNIVERSITY",
    location: "Vadodara, Gujarat",
    period: "2022 — 2026",
    description:
      "Currently pursuing Bachelor's degree with a focus on product lifecycle and development.",
    achievements: ["CGPA: 8.63 / 10"],
  },
  {
    degree: "Higher Secondary Science stream",
    field: "Science",
    institution: "Sarva Vidhyalaya High School",
    location: "Kadi, Mahesana",
    period: "2020 — 2022",
    description: "Pre-university education with core focus on exact sciences.",
    achievements: ["Percentage: 64.67%"],
  },
  {
    degree: "Secondary School",
    field: "General Education",
    institution: "Mahatma Gandhi U.B. Vidhyalaya",
    location: "Morbi, Gujarat",
    period: "2018 — 2020",
    description: "Completed foundational secondary education.",
    achievements: ["Percentage: 73.67%"],
  },
  {
    degree: "Scrum Master Certification",
    field: "Agile Enterprise Coach",
    institution: "Udemy",
    location: "Online",
    period: "Certified",
    description:
      "Certified in Agile principles and the official Scrum framework, with expertise in sprint planning and backlog management.",
    achievements: [],
  },
  {
    degree: "Figma Essential for UI/UX",
    field: "Design",
    institution: "Udemy",
    location: "Online",
    period: "Certified",
    description:
      "Proficient in using Figma to design high-fidelity wireframes, user-centered prototypes, and seamless user flows.",
    achievements: [],
  },
];

// Utility to dynamically calculate experience based on start date (Jan 2025)
const calculateTotalExperience = () => {
  const start = new Date(2025, 0, 1); // Jan 2025
  const now = new Date();

  // Total months difference
  const totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    now.getMonth() -
    start.getMonth();

  if (totalMonths < 12) {
    return `${totalMonths}`;
  }

  const totalYears = totalMonths / 12;
  return `${totalYears.toFixed(1)}`;
};

export const dynamicExperienceValue = calculateTotalExperience();

export const stats = [
  { value: "4+", label: "Projects Completed" },
  { value: "2", label: "Certifications" },
  { value: dynamicExperienceValue, label: "Years Experience" },
  { value: "100%", label: "Commitment" },
];
