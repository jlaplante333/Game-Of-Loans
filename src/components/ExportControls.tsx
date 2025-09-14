import React from 'react';
import { Card, CardContent } from './ui/Card';

const ExportControls: React.FC = () => {
  const handleCSVExport = () => {
    // Mock CSV export functionality
    const csvData = [
      ['Metric', 'Value', 'Change'],
      ['Total Customers', '1,234', '+12%'],
      ['Avg. Acceptance Rate', '68.5%', '+3.2%'],
      ['Avg. Discount Given', '0.25%', '+0.05%'],
      ['Customer Retention', '92.1%', '+1.8%']
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'mortgage-analytics-dashboard.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmailReport = async () => {
    // Mock email report functionality
    alert('Email report functionality would integrate with OpenAI API to generate and send a comprehensive report snapshot.');
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Export & Reporting</h3>
            <p className="text-sm text-gray-600">Download data or send automated reports</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleCSVExport}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
            </button>
            
            <button
              onClick={handleEmailReport}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Report
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportControls;
