export type Gender = "male" | "female" | "other";

export type MemberStatus = "active" | "dormant" | "blacklisted";

export type BlacklistPeriod =
  | "30days"
  | "90days"
  | "180days"
  | "1year"
  | "forever";

export interface BlacklistRecord {
  reason: string;
  startDate: Date;
  period: BlacklistPeriod;
  endDate: Date;
}

export interface LoanRecord {
  id: string;
  amount: number;
  dateBorrowed: Date;
  status: "completed" | "active" | "defaulted" | "overdue";
  completionDate: Date;
}

export interface Member {
  id: string;
  firstName: string; // Required
  secondName: string; // Required
  thirdName: string; // Required
  idNumber: string; // Required
  dateOfBirth: Date; // Required
  gender: Gender; // Required
  town: string; // Required
  collector: string; // Auto-assigned based on town
  email?: string; // Optional
  phoneNumber: string; // Required
  profilePicture: string; // Required - URL to stored image
  enrollmentDate: Date; // Required - Auto-filled
  idFrontImage: string; // Required - URL to stored image
  idBackImage: string; // Required - URL to stored image
  status: MemberStatus;
  blacklistHistory: BlacklistRecord[];
  loanHistory: LoanRecord[];

  // Profile metrics
  grossLent: number; // Total amount given without profit
  netProfit: number; // Total interest earned
  totalCycle: number; // Number of loans taken
  clientValue: number; // Score out of 10 (starts at 1)
}

export interface Town {
  id: string;
  name: string; // Required
  nickname?: string; // Optional
  enrollmentDate: Date; // Required
  collector: string; // Required - Selected from available collectors
  collectorPhone: string; // Auto-filled based on collector
  profilePicture?: string; // Optional - URL to stored image
  loanPortfolio: number; // Total standing balances of all clients
}

export interface Collector {
  id: string;
  firstName: string; // Required
  secondName: string; // Required
  thirdName: string; // Required
  idNumber: string; // Required
  dateOfBirth: Date; // Required
  gender: Gender; // Required
  email?: string; // Optional
  phoneNumber: string; // Required
  profilePicture: string; // Required - URL to stored image
  enrollmentDate: Date; // Required - Auto-filled
  idFrontImage: string; // Required - URL to stored image
  idBackImage: string; // Required - URL to stored image
  password?: string; // Generated and sent via SMS/email
}

export interface DailyCollection {
  id: string;
  date: Date;
  collector: string;
  town: string;
  transactions: CollectionTransaction[];
  totalAmount: number;
}

export interface CollectionTransaction {
  time: Date;
  clientName: string;
  amount: number;
  method: "cash" | "mpesa";
  transactionId: string; // Time stamp for cash, network code for mobile money
}

export interface Loan {
  id: string;
  memberId: string;
  memberName: string; // Auto-filled
  town: string; // Auto-filled
  phoneNumber: string; // Auto-filled
  amount: number;
  interestPercentage: number;
  numberOfDays: number;
  collectorCommission: number;

  // Computed fields
  totalExpected: number;
  interestExpected: number;
  dailyAmount: number;
  completionDate: Date;

  // Loan status
  status: "active" | "overdue" | "completed" | "defaulted";
  balance: number;
  disbursementTransactionId?: string;
  totalFines: number;
}

export interface LoanRepayment {
  id: string;
  loanId: string;
  date: Date;
  amount: number;
  fine: number;
  balance: number;
  method: "cash" | "mpesa";
  transactionId: string;
  collector: string;
}

export interface CollectorCommission {
  loanId: string;
  memberName: string;
  totalLoan: number;
  loanBalance: number;
  status: "active" | "overdue" | "finished";
  agreedCommission: number;
  commissionStatus: "pending" | "paid";
  month: string;
  year: number;
}
