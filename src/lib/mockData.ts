export interface Profile {
  fullName: string;
  nickname: string;
  birthDate: string;
  occupation: string;
  address: string;
  phone: string;
  socialMedia: string;
  notes: string;
  photoUrl?: string;
}

export interface BudgetItem {
  id: string;
  itemName: string;
  category: string;
  estimatedBudget: number;
  actualBudget: number;
  status: 'Paid' | 'Deposit Paid' | 'Unpaid';
  dueDate: string;
  notes: string;
}

export interface Course {
  id: string;
  category: 'Groom Only' | 'Bride Only' | 'Couple Together';
  title: string;
  description: string;
  thumbnail: string;
  lessons: { id: string; title: string; duration: string; completed: boolean }[];
  completed: boolean;
}

export interface Invitee {
  id: string;
  name: string;
  phone: string;
  address: string;
  rsvpStatus: 'Attending' | 'Declined' | 'Pending';
  attendanceStatus: 'Confirmed' | 'Unconfirmed';
  group: 'Family' | 'Friends' | 'VIP';
  notes: string;
}

export interface InvitationSettings {
  theme: 'Blossom' | 'Emerald' | 'Gold' | 'Lavender';
  primaryColor: string;
  fontFamily: 'Playfair Display' | 'Great Vibes' | 'Montserrat' | 'Lora';
  backgroundMusic: boolean;
  musicUrl: string;
  story: string;
  confirmed: boolean;
}

export const initialGroomProfile: Profile = {
  fullName: "Ronal Erlangga",
  nickname: "Ronal",
  birthDate: "1998-08-12",
  occupation: "Senior Software Engineer",
  address: "Graha Estetika Residence, Blok B3, Jakarta",
  phone: "+62 812-3456-7890",
  socialMedia: "@ronal.erl",
  notes: "Looking forward to building our dream home and a calm, happy, loving household together.",
  photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300"
};

export const initialBrideProfile: Profile = {
  fullName: "Lidya Ayu Sukamawandira",
  nickname: "Lidya",
  birthDate: "2000-05-15",
  occupation: "Creative Director & Designer",
  address: "Permata Hijau Mansions, Tower C, Jakarta",
  phone: "+62 899-8765-4321",
  socialMedia: "@lidyayu.suka",
  notes: "Excited for our romantic wedding day, sharing laughs, and growing old alongside my best friend.",
  photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300"
};

export const initialBudgetItems: BudgetItem[] = [
  {
    id: "b1",
    itemName: "Amanjiwo Luxury Resort Wedding Venue",
    category: "Venue",
    estimatedBudget: 80000000,
    actualBudget: 75000000,
    status: "Deposit Paid",
    dueDate: "2026-08-15",
    notes: "Deposit of 35 million paid. Rest is due 1 month before the event."
  },
  {
    id: "b2",
    itemName: "Premium Indonesian-Western Buffet Catering (500 pax)",
    category: "Catering",
    estimatedBudget: 60000000,
    actualBudget: 58000000,
    status: "Unpaid",
    dueDate: "2026-10-01",
    notes: "Includes premium dessert corner, mocktail bar, and traditional stalls."
  },
  {
    id: "b3",
    itemName: "Elegant Rose Gold & Orchid Dream Decoration",
    category: "Decoration",
    estimatedBudget: 35000000,
    actualBudget: 35000000,
    status: "Paid",
    dueDate: "2026-05-01",
    notes: "Includes animated flower arch, floating crystal lightings, and neon initials."
  },
  {
    id: "b4",
    itemName: "Bridal Gown & Custom Silk Tuxedo Outfit",
    category: "Outfit",
    estimatedBudget: 25000000,
    actualBudget: 28000000,
    status: "Paid",
    dueDate: "2026-04-10",
    notes: "Both designs are hand-embroidered by local artisan. Custom silk tie included."
  },
  {
    id: "b5",
    itemName: "Traditional Javanese/Modern Makeup & Hair Styling",
    category: "Makeup",
    estimatedBudget: 8000000,
    actualBudget: 8000000,
    status: "Paid",
    dueDate: "2026-05-20",
    notes: "Includes rehearsals for bride, groom, and both mothers."
  },
  {
    id: "b6",
    itemName: "Cinematic Prewedding & Wedding Photography Portfolio",
    category: "Documentation",
    estimatedBudget: 15000000,
    actualBudget: 15000000,
    status: "Deposit Paid",
    dueDate: "2026-06-30",
    notes: "Includes drone footage, 2 photographers, 2 videographers, and a premium leather album."
  },
  {
    id: "b7",
    itemName: "Laser-cut Acrylic Invites & Biodegradable Souvenirs",
    category: "Souvenir",
    estimatedBudget: 10000000,
    actualBudget: 9000000,
    status: "Paid",
    dueDate: "2026-03-15",
    notes: "Handcrafted lavender soy wax candles and custom glass matches."
  },
  {
    id: "b8",
    itemName: "VIP Alphard Rental & Guest Shuttle Buses",
    category: "Transportation",
    estimatedBudget: 6000000,
    actualBudget: 0,
    status: "Unpaid",
    dueDate: "2026-11-20",
    notes: "Shuttle for family members from airport to resort."
  },
  {
    id: "b9",
    itemName: "Classical String Quartet & Jazz Quintet Live Band",
    category: "Entertainment",
    estimatedBudget: 12000000,
    actualBudget: 12000000,
    status: "Unpaid",
    dueDate: "2026-10-15",
    notes: "Requests: 'Perfect' by Ed Sheeran and Javanese instrumental jazz."
  }
];

export const initialCourses: Course[] = [
  {
    id: "c1",
    category: "Groom Only",
    title: "Becoming an Emotionally Intelligent Husband",
    description: "Learn how to actively listen, validate your wife's feelings, resolve domestic disputes gracefully, and lead with empathy.",
    thumbnail: "👨‍💼",
    completed: false,
    lessons: [
      { id: "c1-l1", title: "Active Listening vs. Fixing Problems", duration: "12 mins", completed: true },
      { id: "c1-l2", title: "Managing Stress and Household Frustrations", duration: "15 mins", completed: false },
      { id: "c1-l3", title: "The Art of Apology and Making Amends", duration: "10 mins", completed: false },
      { id: "c1-l4", title: "Shared Emotional Labors and Household Chores", duration: "18 mins", completed: false }
    ]
  },
  {
    id: "c2",
    category: "Bride Only",
    title: "Nurturing Emotional Intimacy and Comfort",
    description: "Explore the psychological pillars of supportive marriage, communication techniques, and self-care during marital transitions.",
    thumbnail: "👩‍💼",
    completed: false,
    lessons: [
      { id: "c2-l1", title: "Understanding Male Vulnerability & Pride", duration: "14 mins", completed: true },
      { id: "c2-l2", title: "Communicating Needs and Desires Unapologetically", duration: "16 mins", completed: false },
      { id: "c2-l3", title: "Creating a Safe Havens inside the Home", duration: "12 mins", completed: false }
    ]
  },
  {
    id: "c3",
    category: "Couple Together",
    title: "Conquering Wealth and Financial Union Together",
    description: "Align your financial habits, configure joint checking/savings goals, set family budgets, and plan long-term investments seamlessly.",
    thumbnail: "💰",
    completed: false,
    lessons: [
      { id: "c3-l1", title: "The Joint Account vs. Personal Allowances Debate", duration: "20 mins", completed: true },
      { id: "c3-l2", title: "Debt Management and Long-Term Credit Planning", duration: "18 mins", completed: true },
      { id: "c3-l3", title: "Creating an Emergency & Child Education Fund", duration: "25 mins", completed: false },
      { id: "c3-l4", title: "Yearly Budget Audits and Transparent Reviews", duration: "15 mins", completed: false }
    ]
  },
  {
    id: "c4",
    category: "Couple Together",
    title: "Constructive Conflict and Deep Connection",
    description: "Every couple fights. Master the art of fighting fair, de-escalating arguments, and returning to a state of absolute love and trust.",
    thumbnail: "❤️",
    completed: true,
    lessons: [
      { id: "c4-l1", title: "The Four Horsemen of Marital Apocalypse", duration: "15 mins", completed: true },
      { id: "c4-l2", title: "Using 'I' Statements and Non-Violent Words", duration: "12 mins", completed: true },
      { id: "c4-l3", title: "Repair Attempts and Taking Time-Outs", duration: "14 mins", completed: true }
    ]
  }
];

export const initialInvitees: Invitee[] = [
  {
    id: "i1",
    name: "Aria Sukamawandira (Father of Bride)",
    phone: "+62 811-1111-2222",
    address: "Permata Hijau Mansions, Tower C, Jakarta",
    rsvpStatus: "Attending",
    attendanceStatus: "Confirmed",
    group: "VIP",
    notes: "Speaks at the ceremony. Special dietary: Low sodium buffet."
  },
  {
    id: "i2",
    name: "Ratna Sukamawandira (Mother of Bride)",
    phone: "+62 811-1111-3333",
    address: "Permata Hijau Mansions, Tower C, Jakarta",
    rsvpStatus: "Attending",
    attendanceStatus: "Confirmed",
    group: "VIP",
    notes: "Requires makeup artist. Allergic to shellfish."
  },
  {
    id: "i3",
    name: "Gerry Erlangga (Father of Groom)",
    phone: "+62 811-2222-4444",
    address: "Graha Estetika Residence, Blok B3, Jakarta",
    rsvpStatus: "Attending",
    attendanceStatus: "Confirmed",
    group: "VIP",
    notes: "Speaks at the reception. Prefers hot Javanese tea."
  },
  {
    id: "i4",
    name: "Astri Erlangga (Mother of Groom)",
    phone: "+62 811-2222-5555",
    address: "Graha Estetika Residence, Blok B3, Jakarta",
    rsvpStatus: "Attending",
    attendanceStatus: "Confirmed",
    group: "VIP",
    notes: "Requires makeup artist. Wheelchair accessibility required."
  },
  {
    id: "i5",
    name: "Prof. Dr. Irfan Widjaja",
    phone: "+62 813-8888-9999",
    address: "Menteng Residence No. 42, Jakarta Pusat",
    rsvpStatus: "Pending",
    attendanceStatus: "Unconfirmed",
    group: "VIP",
    notes: "Special guest (Groom's university advisor). Send physical premium card."
  },
  {
    id: "i6",
    name: "Ahmad Maulana",
    phone: "+62 856-7777-6666",
    address: "Bintaro Jaya Sektor 9, Tangerang Selatan",
    rsvpStatus: "Attending",
    attendanceStatus: "Confirmed",
    group: "Friends",
    notes: "Groom's high school best friend. Coming with spouse (2 pax)."
  },
  {
    id: "i7",
    name: "Clara Setyawati",
    phone: "+62 857-3333-2222",
    address: "Kemang Timur No. 18, Jakarta Selatan",
    rsvpStatus: "Attending",
    attendanceStatus: "Confirmed",
    group: "Friends",
    notes: "Bride's coworker. Coming alone."
  },
  {
    id: "i8",
    name: "Yusuf Hidayat",
    phone: "+62 812-9999-0000",
    address: "Ubud Raya No. 10, Bali",
    rsvpStatus: "Declined",
    attendanceStatus: "Unconfirmed",
    group: "Friends",
    notes: "Cannot travel due to business commitments. Will send flower board."
  },
  {
    id: "i9",
    name: "Budi Santoso",
    phone: "+62 813-4444-5555",
    address: "Gayungsari Barat No. 8, Surabaya",
    rsvpStatus: "Pending",
    attendanceStatus: "Unconfirmed",
    group: "Family",
    notes: "Uncle from father's side. Check if requires hotel reservation."
  }
];

export const motivationalQuotes = [
  "Marriage is not just about finding the right person, it is about being the right partner.",
  "A successful marriage requires falling in love many times, always with the same person.",
  "Grow old along with me! The best is yet to be.",
  "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
  "To love and be loved is to feel the sun from both sides.",
  "A great marriage is not when the perfect couple comes together. It is when an imperfect couple learns to enjoy their differences.",
  "There is no more lovely, friendly, and charming relationship, communion or company than a good marriage."
];

export const initialInvitationSettings: InvitationSettings = {
  theme: "Blossom",
  primaryColor: "#F7D6D0",
  fontFamily: "Playfair Display",
  backgroundMusic: true,
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  story: "Ronal and Lidya met at a creative tech conference in 2022. Shared cups of coffee grew into late-night designs and code commits. Over two years, they inspired each other's work and fell in love. On a quiet evening in Ubud, Ronal asked Lidya to spend forever together. Now, they invite you to celebrate their union and embark on their lifetime journey of love.",
  confirmed: false
};
