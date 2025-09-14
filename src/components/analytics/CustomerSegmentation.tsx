import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

// Mock data for development
const mockSegmentData = [
  {
    segment: 'First-time Buyers',
    totalCustomers: 156,
    dealsAccepted: 89,
    acceptanceRate: 57.1,
    averageRate: 6.8
  },
  {
    segment: 'Low Assets (0-1)',
    totalCustomers: 203,
    dealsAccepted: 134,
    acceptanceRate: 66.0,
    averageRate: 6.5
  },
  {
    segment: 'Medium Assets (2-3)',
    totalCustomers: 98,
    dealsAccepted: 71,
    acceptanceRate: 72.4,
    averageRate: 6.2
  },
  {
    segment: 'High Assets (4+)',
    totalCustomers: 45,
    dealsAccepted: 38,
    acceptanceRate: 84.4,
    averageRate: 5.9
  },
  {
    segment: 'High Loyalty',
    totalCustomers: 87,
    dealsAccepted: 76,
    acceptanceRate: 87.4,
    averageRate: 5.8
  },
  {
    segment: 'Medium Loyalty',
    totalCustomers: 234,
    dealsAccepted: 156,
    acceptanceRate: 66.7,
    averageRate: 6.4
  },
  {
    segment: 'Low Loyalty',
    totalCustomers: 181,
    dealsAccepted: 100,
    acceptanceRate: 55.2,
    averageRate: 6.9
  }
];

const CustomerSegmentation: React.FC = () => {
  const getAcceptanceColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-100 text-green-800';
    if (rate >= 65) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Segmentation Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Segment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Customers
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deals Accepted
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acceptance Rate
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockSegmentData.map((segment, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {segment.segment}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {segment.totalCustomers}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {segment.dealsAccepted}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAcceptanceColor(segment.acceptanceRate)}`}>
                      {segment.acceptanceRate}%
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {segment.averageRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-blue-600">Best Performing Segment</div>
            <div className="text-lg font-semibold text-blue-900">High Loyalty</div>
            <div className="text-sm text-blue-700">87.4% acceptance rate</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-green-600">Largest Segment</div>
            <div className="text-lg font-semibold text-green-900">Medium Loyalty</div>
            <div className="text-sm text-green-700">234 customers</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-600">Best Rate Segment</div>
            <div className="text-lg font-semibold text-purple-900">High Loyalty</div>
            <div className="text-sm text-purple-700">5.8% average rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentation;
