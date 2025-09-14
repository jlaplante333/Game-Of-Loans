import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import MortgageRatePerformance from './analytics/MortgageRatePerformance';
import PromotionalEffectiveness from './analytics/PromotionalEffectiveness';
import CustomerSegmentation from './analytics/CustomerSegmentation';
import NegotiationImpact from './analytics/NegotiationImpact';
import FunnelAnalysis from './analytics/FunnelAnalysis';
import ExportControls from './ExportControls';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mortgage Rate Negotiator Analytics
          </h1>
          <p className="text-gray-600">
            Comprehensive analytics dashboard for mortgage rate performance and customer insights
          </p>
        </div>

        {/* Export Controls */}
        <div className="mb-6">
          <ExportControls />
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Mortgage Rate Performance */}
          <div className="lg:col-span-2">
            <MortgageRatePerformance />
          </div>

          {/* Promotional Effectiveness */}
          <PromotionalEffectiveness />

          {/* Customer Segmentation */}
          <CustomerSegmentation />

          {/* Negotiation Impact */}
          <div className="lg:col-span-2">
            <NegotiationImpact />
          </div>

          {/* Funnel Analysis */}
          <div className="lg:col-span-2">
            <FunnelAnalysis />
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Acceptance Rate</p>
                  <p className="text-2xl font-bold text-gray-900">68.5%</p>
                  <p className="text-xs text-green-600">+3.2% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Discount Given</p>
                  <p className="text-2xl font-bold text-gray-900">0.25%</p>
                  <p className="text-xs text-red-600">+0.05% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Customer Retention</p>
                  <p className="text-2xl font-bold text-gray-900">92.1%</p>
                  <p className="text-xs text-green-600">+1.8% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
