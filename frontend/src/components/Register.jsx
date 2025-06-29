import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    address: "",
    hasVan: "",
    license: null,
  });

  const [errors, setErrors] = useState({});
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "license") {
      setFormData((prev) => ({ ...prev, license: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUseCurrentLocation = () => {
  setLoadingLocation(true);

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this browser.");
    setLoadingLocation(false);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          {
            headers: {
              "Accept-Language": "en",
              "User-Agent": "Volunteer-App", // Some APIs require this
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data from OpenStreetMap.");
        }

        // Optional: validate response
        const data = await response.json();
        if (!data.lat || !data.lon) {
          throw new Error("OpenStreetMap API did not return valid coordinates.");
        }

        setFormData((prev) => ({
          ...prev,
          address: `Latitude: ${data.lat}, Longitude: ${data.lon}`,
        }));
      } catch (error) {
        alert("Failed to get location data from OpenStreetMap.");
        console.error(error);
      } finally {
        setLoadingLocation(false);
      }
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("Permission denied. Please allow location access.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get your location timed out.");
          break;
        default:
          alert("An unknown error occurred while fetching location.");
      }
      setLoadingLocation(false);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
};

  const getAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validate = () => {
    const newErrors = {};
    const age = getAge(formData.dob);
    if (age < 18) newErrors.dob = "Must be 18 or older";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("Thank you for registering as a volunteer! 🚐");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl px-8 py-8 max-w-lg w-full font-poppins"
      >
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">🙋 Volunteer Registration</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 border border-purple-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 transition"

          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full px-4 py-3 border border-purple-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 transition"

          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
           className="w-full px-4 py-3 border border-purple-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 transition"

          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-purple-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 transition"

          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-3 border border-purple-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 transition"

          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-purple-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 transition"

            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <div className="flex gap-2">
              <textarea
                name="address"
                value={formData.address}
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
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-medium mt-2"
          >
            Register as Volunteer
          </button>
        </div>
      </form>
    </div>
  );
}