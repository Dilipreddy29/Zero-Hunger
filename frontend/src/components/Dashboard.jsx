import React from 'react';
import { Heart, Users } from 'lucide-react';
import DonorTable from './DonorTable';
import DeliveryCharts from './DeliveryCharts';
import VolunteerResources from './VolunteerResources';
import StatsCards from './StatsCards';
import VolunteerTasks from './VolunteerTasks';

import {
  donorData,
  monthlyDeliveries,
  volunteerFAQs,
  weeklyDeliveries,
  foodTypeDistribution,
} from '../data/SampleData';

const volunteerTasks = [
  {
    _id: "6860b3942f5c715918c04d23",
    donorId: "68607d331d3c08312f9e1889",
    donorName: "Test Donor",
    donorPhone: "9876543210",
    foodDescription: "Veg Biryani",
    quantity: 30,
    type: "veg",
    pickupAddress: "Madhura Nagar, Kamareddy",
    location: {
      type: "Point",
      coordinates: [78.4483, 17.4375],
    },
    preferredPickupTime: "2025-06-28T13:30:00.000+00:00",
    expiryTime: "2025-06-28T15:00:00.000+00:00",
    images: ["https://example.com/image1.jpg"],
    status: "pending",
    createdAt: "2025-06-29T03:31:32.265+00:00",
    __v: 0,
  },
  {
    _id: "6860b4732f5c715918c04d26",
    donorId: "68607d331d3c08312f9e1889",
    donorName: "Test Donor",
    donorPhone: "9876543210",
    foodDescription: "Veg Biryani",
    quantity: 30,
    type: "veg",
    pickupAddress: "Madhura Nagar, Kamareddy",
    location: {
      type: "Point",
      coordinates: [78.4483, 17.4375],
    },
    preferredPickupTime: "2025-06-28T13:30:00.000+00:00",
    expiryTime: "2025-06-28T15:00:00.000+00:00",
    images: ["https://example.com/image2.jpg"],
    status: "accepted",
    assignedVolunteer: "68607d331d3c08312f9e1889",
    createdAt: "2025-06-29T03:35:15.971+00:00",
    __v: 0,
  },
  {
    _id: "6860b52b2f5c715918c04d2c",
    donorId: "68607d331d3c08312f9e1889",
    donorName: "Test Donor",
    donorPhone: "9876543210",
    foodDescription: "Veg Biryani",
    quantity: 30,
    type: "veg",
    pickupAddress: "Madhura Nagar, Kamareddy",
    location: {
      type: "Point",
      coordinates: [78.4483, 17.4375],
    },
    preferredPickupTime: "2025-06-28T13:30:00.000+00:00",
    expiryTime: "2025-06-28T15:00:00.000+00:00",
    images: ["https://example.com/image3.jpg"],
    status: "accepted",
    assignedVolunteer: "6860afc514723031fefd1993",
    createdAt: "2025-06-29T03:38:19.024+00:00",
    __v: 0,
  }
];

const Dashboard = () => {
  const totalDeliveries = 127;

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Volunteer Tasks */}
        <div className="mb-8">
          <VolunteerTasks tasks={volunteerTasks} />
        </div>

        {/* Stats */}
        <StatsCards donorData={donorData} totalDeliveries={totalDeliveries} />

        {/* Charts */}
        <div className="mb-8">
          <DeliveryCharts
            monthlyData={monthlyDeliveries ?? []}
            weeklyData={weeklyDeliveries ?? []}
            foodTypeData={foodTypeDistribution ?? []}
          />
        </div>

        {/* Table + Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <DonorTable data={donorData} />
          </div>
          <div>
            <VolunteerResources faqs={volunteerFAQs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
