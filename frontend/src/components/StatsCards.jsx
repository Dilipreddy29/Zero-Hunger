import React from 'react';
import { Award, MapPin, TrendingUp, Package } from 'lucide-react';

const StatsCards = ({ donorData, totalDeliveries }) => {
  // Calculate top pickup location
  const locationCounts = donorData.reduce((acc, donor) => {
    acc[donor.location] = (acc[donor.location] || 0) + 1;
    return acc;
  }, {});

  const topLocation = Object.entries(locationCounts).reduce((a, b) =>
    locationCounts[a[0]] > locationCounts[b[0]] ? a : b
  )[0];

  // Calculate completion rate
  const completedDeliveries = donorData.filter(donor => donor.status === 'Delivered').length;
  const completionRate = Math.round((completedDeliveries / donorData.length) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Deliveries */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Deliveries</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-3xl font-bold">{totalDeliveries}</p>
              {totalDeliveries > 10 && (
                <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Star Volunteer ⭐
                </span>
              )}
            </div>
          </div>
          <Package className="w-8 h-8 text-blue-200" />
        </div>
      </div>

      {/* Top Pickup Location */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Top Pickup Location</p>
            <p className="text-xl font-bold mt-1">{topLocation}</p>
            <p className="text-green-200 text-xs">{locationCounts[topLocation]} pickups</p>
          </div>
          <MapPin className="w-8 h-8 text-green-200" />
        </div>
      </div>

      {/* Completion Rate */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Completion Rate</p>
            <p className="text-3xl font-bold mt-1">{completionRate}%</p>
            <p className="text-purple-200 text-xs">{completedDeliveries} of {donorData.length} orders</p>
          </div>
          <TrendingUp className="w-8 h-8 text-purple-200" />
        </div>
      </div>

      {/* Active Donations */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm font-medium">Active Donations</p>
            <p className="text-3xl font-bold mt-1">
              {donorData.filter(donor => donor.status !== 'Delivered').length}
            </p>
            <p className="text-orange-200 text-xs">Pending & In Progress</p>
          </div>
          <Award className="w-8 h-8 text-orange-200" />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
