import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

// Mock data for development
const mockNegotiationData = [
  { round: 1, totalNegotiations: 234, successfulNegotiations: 156, successRate: 66.7, averageDiscount: 0.15 },
  { round: 2, totalNegotiations: 78, successfulNegotiations: 61, successRate: 78.2, averageDiscount: 0.28 },
  { round: 3, totalNegotiations: 17, successfulNegotiations: 14, successRate: 82.4, averageDiscount: 0.42 },
  { round: 4, totalNegotiations: 3, successfulNegotiations: 3, successRate: 100, averageDiscount: 0.55 }
];

const mockDiscountAcceptanceData = [
  { discountRange: '0-0.2%', offers: 145, accepted: 89, acceptanceRate: 61.4 },
  { discountRange: '0.2-0.4%', offers: 98, accepted: 78, acceptanceRate: 79.6 },
  { discountRange: '0.4-0.6%', offers: 23, accepted: 21, acceptanceRate: 91.3 },
  { discountRange: '0.6%+', offers: 8, accepted: 8, acceptanceRate: 100 }
];

const NegotiationImpact: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Negotiation Strategy Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Funnel Visualization */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Negotiation Round Success Rates</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockNegotiationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="successRate" fill="#10b981" name="Success Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Discount vs Acceptance */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Discount vs Final Acceptance</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockNegotiationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="round" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="averageDiscount" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Avg Discount %"
                />
                <Line 
                  type="monotone" 
                  dataKey="successRate" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Success Rate %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-blue-600">Avg Negotiation Rounds</div>
            <div className="text-2xl font-bold text-blue-900">1.4</div>
            <div className="text-xs text-blue-700">Per successful deal</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-600">Overall Success Rate</div>
            <div className="text-2xl font-bold text-green-900">71.2%</div>
            <div className="text-xs text-green-700">All negotiations</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-600">Avg Discount Given</div>
            <div className="text-2xl font-bold text-purple-900">0.25%</div>
            <div className="text-xs text-purple-700">Successful deals</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-orange-600">Best Round</div>
            <div className="text-2xl font-bold text-orange-900">Round 4</div>
            <div className="text-xs text-orange-700">100% success rate</div>
          </div>
        </div>

        {/* Discount Range Analysis */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Acceptance Rate by Discount Range</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount Range
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Offers
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Accepted
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acceptance Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockDiscountAcceptanceData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.discountRange}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.offers}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.accepted}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.acceptanceRate}%
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

export default NegotiationImpact;
