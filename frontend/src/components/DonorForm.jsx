import React, { useState } from "react";
import { createDonation } from "../apiService";

export default function DonorForm() {
  const [formData, setFormData] = useState({
    donorName: "",
    foodDescription: "",
    quantity: "",
    donorPhone: "", // FIXED: was "donorPhone"
    location: "", // Will be converted to { type: 'Point', coordinates: [lng, lat] }
    pickupAddress: "",
    type: "veg",
    preferredPickupTime: "",
    expiryTime: "",
    images: [],
  });

  const [status] = useState("pending");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUseCurrentLocation = () => {
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
            {
              headers: {
                "Accept-Language": "en",
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch address");
          const data = await response.json();
          setFormData((prev) => ({
            ...prev,
            pickupAddress: data.display_name || `${lat}, ${lng}`, // FIXED: use correct key
            location: `${lat}, ${lng}`,
          }));
        } catch (_err) {
          alert("Could not fetch address from location.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (_error) => {
        alert("⚠️ Could not fetch location. Please allow location access.");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const donationData = {
          ...formData,
          location: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          status,
          volunteerId: null,
          preferredPickupTime: formData.preferredPickupTime
            ? new Date(formData.preferredPickupTime).toISOString()
            : new Date().toISOString(),
          expiryTime: formData.expiryTime
            ? new Date(formData.expiryTime).toISOString()
            : new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          images: formData.images,
        };

        try {
          const response = await createDonation(donationData);
          const { message, volunteerName, volunteerPhone } = response.data;

          if (volunteerName && volunteerPhone) {
            alert(
              `Order is placed. Volunteer: ${volunteerName}, Phone: ${volunteerPhone}.`
            );
          } else {
            alert(message);
          }
        } catch (error) {
          console.error("Error submitting donation:", error);
          alert(
            error.response?.data?.error ||
              "An error occurred while submitting your donation."
          );
        }
      },
      (error) => {
        console.error(error);
        alert("⚠️ Could not fetch location. Please allow location access.");
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#4E342E] font-sans p-6">
      <header className="bg-[#0041f5] text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Food Donation</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white mt-8 p-6 rounded shadow">
        <form onSubmit={handleSubmit} className="grid gap-5">
          <h2 className="text-xl font-bold text-[#0069fb] mb-1 text-center">
            Donor Information
          </h2>

          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              name="donorPhone"
              value={formData.donorPhone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <h2 className="text-xl font-bold text-[#007dfb] mt-2 text-center">
            Donation Details
          </h2>

          <div>
            <label className="block text-sm font-medium mb-1">
              Food Description
            </label>
            <textarea
              name="foodDescription"
              value={formData.foodDescription}
              onChange={handleChange}
              placeholder="Describe the food (e.g. Veg Biryani, Dal)"
              className="border p-2 rounded w-full"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Quantity (People Served)
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Food Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Pickup Time
            </label>
            <input
              type="datetime-local"
              name="preferredPickupTime"
              value={formData.preferredPickupTime}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Expiry Time</label>
            <input
              type="datetime-local"
              name="expiryTime"
              value={formData.expiryTime}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Images (comma-separated URLs)
            </label>
            <input
              type="text"
              name="images"
              value={formData.images.join(",")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  images: e.target.value
                    .split(",")
                    .map((url) => url.trim())
                    .filter(Boolean),
                }))
              }
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
              className="border p-2 rounded w-full"
            />
          </div>

          {formData.location && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Location (Lat,Lng)
              </label>
              <input
                type="text"
                value={formData.location}
                readOnly
                className="border p-2 rounded w-full bg-gray-100"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <div className="flex gap-2">
              <textarea
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                placeholder="Address"
                required
                rows="2"
                className="w-full px-4 py-3 border border-purple-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={loadingLocation}
                className={`px-3 py-2 rounded text-white ${
                  loadingLocation
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loadingLocation ? "Fetching..." : "Use My Location"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-[#0075fb] text-white px-6 py-2 rounded hover:bg-[#759bd4]"
          >
            Submit Donation
          </button>
        </form>
      </div>

      <footer className="text-center text-sm text-gray-600 mt-8">
        &copy; {new Date().getFullYear()} Food Donation. All rights reserved.
      </footer>
    </div>
  );
}
