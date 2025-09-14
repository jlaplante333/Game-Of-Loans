import React, { useMemo } from 'react';
import { Card, CardContent, CardTitle } from '../ui/Card';
import { KPIData } from '../../types/index';

// Mock data for development (fallback) - Based on 4 customers total
const mockCustomerData = [
  { id: 1, name: 'John Doe', status: 'active' },
  { id: 2, name: 'Jane Smith', status: 'active' },
  { id: 3, name: 'Bob Johnson', status: 'active' },
  { id: 4, name: 'Alice Brown', status: 'inactive' }
];

const mockOfferData = [
  { customerId: 1, offered: true, accepted: true },
  { customerId: 2, offered: true, accepted: false },
  { customerId: 3, offered: true, accepted: true },
  { customerId: 4, offered: true, accepted: true }
];

const mockNegotiationData = [
  { customerId: 1, discountPercentage: 0.5 },
  { customerId: 2, discountPercentage: 0.8 },
  { customerId: 3, discountPercentage: 0.3 },
  { customerId: 4, discountPercentage: 0.2 }
];

const mockMortgageData = [
  { customerId: 1, completed: true },
  { customerId: 2, completed: false },
  { customerId: 3, completed: true },
  { customerId: 4, completed: true }
];

const KPISummary: React.FC = () => {
  const kpiData = useMemo(() => {
    // Calculate Total Customers
    const totalCustomers = mockCustomerData.length;

    // Calculate Acceptance Rate
    const totalOffers = mockOfferData.length;
    const acceptedOffers = mockOfferData.filter(offer => offer.accepted).length;
    const acceptanceRate = totalOffers > 0 ? (acceptedOffers / totalOffers) * 100 : 0;

    // Calculate Average Discount
    const totalDiscount = mockNegotiationData.reduce((sum, neg) => sum + neg.discountPercentage, 0);
    const averageDiscount = mockNegotiationData.length > 0 ? totalDiscount / mockNegotiationData.length : 0;

    // Calculate Retention Rate
    const completedMortgages = mockMortgageData.filter(mortgage => mortgage.completed).length;
    const retentionRate = totalCustomers > 0 ? (completedMortgages / totalCustomers) * 100 : 0;

    return [
      {
        title: 'Total Customers',
        value: totalCustomers.toLocaleString(),
        change: '+50% from last month',
        trend: 'up' as const
      },
      {
        title: 'Acceptance Rate',
        value: `${acceptanceRate.toFixed(1)}%`,
        change: '+25% from last month',
        trend: 'up' as const
      },
      {
        title: 'Average Discount',
        value: `${(averageDiscount * 100).toFixed(1)}%`,
        change: '-30% from last month',
        trend: 'down' as const
      },
      {
        title: 'Retention Rate',
        value: `${retentionRate.toFixed(1)}%`,
        change: '+50% from last month',
        trend: 'up' as const
      }
    ];
  }, []);

  const getTrendIcon = (trend: KPIData['trend']) => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '';
    }
  };

  const getTrendColor = (trend: KPIData['trend']) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-gray-600 mb-2">
                  {kpi.title}
                </CardTitle>
                <div className="text-2xl font-bold text-gray-900">
                  {kpi.value}
                </div>
                {kpi.change && (
                  <div className={`flex items-center mt-2 text-sm ${getTrendColor(kpi.trend)}`}>
                    <span className="mr-1">{getTrendIcon(kpi.trend)}</span>
                    <span>{kpi.change}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KPISummary;
