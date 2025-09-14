import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mock data generators for development
export const generateMockData = {
  customers: () => [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      isFirstTimeBuyer: true,
      assetsOwned: 0,
      loyaltyRating: "low" as const,
      creditScore: 720,
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      isFirstTimeBuyer: false,
      assetsOwned: 2,
      loyaltyRating: "high" as const,
      creditScore: 780,
      createdAt: "2024-01-20T14:30:00Z"
    },
    {
      _id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      isFirstTimeBuyer: false,
      assetsOwned: 1,
      loyaltyRating: "medium" as const,
      creditScore: 650,
      createdAt: "2024-02-01T09:15:00Z"
    }
  ],

  offers: () => [
    {
      _id: "1",
      customerId: "1",
      mortgageRate: 6.5,
      promotionalOffer: "First-time buyer discount",
      isAccepted: true,
      createdAt: "2024-01-16T10:00:00Z",
      acceptedAt: "2024-01-17T15:30:00Z"
    },
    {
      _id: "2",
      customerId: "2",
      mortgageRate: 5.8,
      promotionalOffer: "Loyalty customer rate",
      isAccepted: true,
      createdAt: "2024-01-21T11:00:00Z",
      acceptedAt: "2024-01-22T16:45:00Z"
    },
    {
      _id: "3",
      customerId: "3",
      mortgageRate: 7.2,
      isAccepted: false,
      createdAt: "2024-02-02T13:20:00Z"
    }
  ],

  negotiations: () => [
    {
      _id: "1",
      customerId: "1",
      offerId: "1",
      round: 1,
      discountPercentage: 0.2,
      status: "accepted" as const,
      createdAt: "2024-01-16T12:00:00Z"
    },
    {
      _id: "2",
      customerId: "2",
      offerId: "2",
      round: 2,
      discountPercentage: 0.3,
      status: "accepted" as const,
      createdAt: "2024-01-21T13:30:00Z"
    }
  ],

  mortgages: () => [
    {
      _id: "1",
      customerId: "1",
      offerId: "1",
      finalRate: 6.3,
      originalRate: 6.5,
      discountGiven: 0.2,
      status: "completed" as const,
      createdAt: "2024-01-16T10:00:00Z",
      completedAt: "2024-01-25T16:00:00Z"
    },
    {
      _id: "2",
      customerId: "2",
      offerId: "2",
      finalRate: 5.5,
      originalRate: 5.8,
      discountGiven: 0.3,
      status: "completed" as const,
      createdAt: "2024-01-21T11:00:00Z",
      completedAt: "2024-01-30T14:30:00Z"
    },
    {
      _id: "3",
      customerId: "3",
      offerId: "3",
      finalRate: 7.2,
      originalRate: 7.2,
      discountGiven: 0,
      status: "rate_proposal" as const,
      createdAt: "2024-02-02T13:20:00Z"
    }
  ]
};

// Data processing utilities
export const processRatePerformanceData = (offers: any[]) => {
  const rateRanges = [
    { min: 5, max: 6, label: "5-6%" },
    { min: 6, max: 7, label: "6-7%" },
    { min: 7, max: 8, label: "7-8%" }
  ];

  return rateRanges.map(range => {
    const offersInRange = offers.filter(offer => 
      offer.mortgageRate >= range.min && offer.mortgageRate < range.max
    );
    const acceptedInRange = offersInRange.filter(offer => offer.isAccepted);
    
    return {
      rateRange: range.label,
      offeredCount: offersInRange.length,
      acceptedCount: acceptedInRange.length,
      acceptanceRate: offersInRange.length > 0 ? (acceptedInRange.length / offersInRange.length) * 100 : 0
    };
  });
};

export const processPromotionalData = (offers: any[], customers: any[]) => {
  const promotions = [...new Set(offers.filter(o => o.promotionalOffer).map(o => o.promotionalOffer))];
  
  return promotions.map(promotion => {
    const promotionOffers = offers.filter(o => o.promotionalOffer === promotion);
    const acceptedOffers = promotionOffers.filter(o => o.isAccepted);
    
    const highLoyaltyOffers = promotionOffers.filter(o => {
      const customer = customers.find(c => c._id === o.customerId);
      return customer?.loyaltyRating === 'high';
    });
    
    const lowLoyaltyOffers = promotionOffers.filter(o => {
      const customer = customers.find(c => c._id === o.customerId);
      return customer?.loyaltyRating === 'low';
    });

    return {
      promotionType: promotion,
      totalOffers: promotionOffers.length,
      acceptedOffers: acceptedOffers.length,
      acceptanceRate: promotionOffers.length > 0 ? (acceptedOffers.length / promotionOffers.length) * 100 : 0,
      highLoyaltyAcceptance: highLoyaltyOffers.filter(o => o.isAccepted).length,
      lowLoyaltyAcceptance: lowLoyaltyOffers.filter(o => o.isAccepted).length
    };
  });
};

// CSV export utility
export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header]).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
