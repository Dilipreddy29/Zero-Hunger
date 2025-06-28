import React, { useState } from "react";

export default function DonorForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    quantity: "",
    location: "",
    menu: "",
  });

  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setFormData(prev => ({
          ...prev,
          location: `Lat: ${coords.latitude.toFixed(5)}, Lon: ${coords.longitude.toFixed(5)}`
        }));
        setLoadingLocation(false);
      },
      () => {
        alert("Failed to get your location.");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you for donating! 🙏");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">🍲 Donor Form</h2>

      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Anjali Sharma"
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. 9876543210"
          pattern="[0-9]{10}"
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Food Quantity (people it can feed)</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="e.g. 25"
          required
          min="1"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Location</label>
        <div className="flex gap-2">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Banjara Hills, Hyderabad"
            required
            className="flex-1 border px-3 py-2 rounded"
          />
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          >
            {loadingLocation ? "Fetching..." : "Use My Location"}
          </button>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Menu (Food Items)</label>
        <textarea
          name="menu"
          value={formData.menu}
          onChange={handleChange}
          placeholder="e.g. Rice, Dal, Chapati, Curry"
          required
          className="w-full border px-3 py-2 rounded"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-medium"
      >
        Submit Donation
      </button>
    </form>
  );
}
