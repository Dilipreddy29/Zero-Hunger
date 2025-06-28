import React from 'react';
import { Heart, Users } from 'lucide-react';
import DonorTable from './DonorTable';
import DeliveryCharts from './DeliveryCharts';
import VolunteerResources from './VolunteerResources';
import StatsCards from './StatsCards';


const Dashboard = () => {
  const totalDeliveries = 127; // Hardcoded total deliveries count

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Volunteer Dashboard</h1>
                <p className="text-sm text-gray-600">Food Rescue & Distribution</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Welcome back, Volunteer!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      
    </div>
  );
};

export default Dashboard;
