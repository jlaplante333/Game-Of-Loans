import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

// Mock data for development
const mockPromotionalData = [
  {
    promotionType: 'First-time buyer discount',
    totalOffers: 45,
    acceptedOffers: 32,
    acceptanceRate: 71.1,
    highLoyaltyAcceptance: 15,
    lowLoyaltyAcceptance: 17
  },
  {
    promotionType: 'Loyalty customer rate',
    totalOffers: 38,
    acceptedOffers: 31,
    acceptanceRate: 81.6,
    highLoyaltyAcceptance: 28,
    lowLoyaltyAcceptance: 3
  },
  {
    promotionType: 'Refinance special',
    totalOffers: 22,
    acceptedOffers: 14,
    acceptanceRate: 63.6,
    highLoyaltyAcceptance: 8,
    lowLoyaltyAcceptance: 6
  }
];

const PromotionalEffectiveness: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Promotional Offer Effectiveness</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Bar Chart */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Acceptance Rates by Promotion Type</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockPromotionalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="promotionType" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="acceptanceRate" fill="#3b82f6" name="Acceptance Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Loyalty Comparison Table */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Performance by Customer Loyalty</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Promotion Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    High Loyalty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Low Loyalty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Accepted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPromotionalData.map((promo, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {promo.promotionType}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {promo.highLoyaltyAcceptance}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {promo.lowLoyaltyAcceptance}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {promo.acceptedOffers}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionalEffectiveness;
