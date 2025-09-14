// Convex data types
export interface Customer {
  _id: string;
  name: string;
  email: string;
  isFirstTimeBuyer: boolean;
  assetsOwned: number;
  loyaltyRating: 'low' | 'medium' | 'high';
  creditScore: number;
  createdAt: string;
}

export interface Offer {
  _id: string;
  customerId: string;
  mortgageRate: number;
  promotionalOffer?: string;
  isAccepted: boolean;
  createdAt: string;
  acceptedAt?: string;
}

export interface Negotiation {
  _id: string;
  customerId: string;
  offerId: string;
  round: number;
  discountPercentage: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Mortgage {
  _id: string;
  customerId: string;
  offerId: string;
  finalRate: number;
  originalRate: number;
  discountGiven: number;
  status: 'background_check' | 'credit_check' | 'rate_proposal' | 'negotiation' | 'final_confirmation' | 'completed' | 'dropped';
  createdAt: string;
  completedAt?: string;
}

// Analytics data types
export interface RatePerformanceData {
  rateRange: string;
  offeredCount: number;
  acceptedCount: number;
  acceptanceRate: number;
}

export interface PromotionalEffectivenessData {
  promotionType: string;
  totalOffers: number;
  acceptedOffers: number;
  acceptanceRate: number;
  highLoyaltyAcceptance: number;
  lowLoyaltyAcceptance: number;
}

export interface CustomerSegmentData {
  segment: string;
  totalCustomers: number;
  dealsAccepted: number;
  acceptanceRate: number;
  averageRate: number;
}

export interface NegotiationImpactData {
  round: number;
  totalNegotiations: number;
  successfulNegotiations: number;
  successRate: number;
  averageDiscount: number;
}

export interface FunnelData {
  stage: string;
  count: number;
  dropoffRate: number;
}

export interface KPIData {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}
