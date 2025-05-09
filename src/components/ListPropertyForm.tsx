"use client";

import { useState } from "react";

export default function ListPropertyForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [houseRules, setHouseRules] = useState("");
  const [images, setImages] = useState<File[]>([]); // Store image files
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Store image previews
  const [amenities, setAmenities] = useState<string[]>([]); // Store selected amenities
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Logic for previewing multiple images
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Generate image previews
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);

      // Store the actual files for submission
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setAmenities((prev) => [...prev, value]);
    } else {
      setAmenities((prev) => prev.filter((amenity) => amenity !== value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to list a property.");
        return;
      }

      // Ensure all required fields are included
      if (
        !title ||
        !description ||
        !country ||
        !city ||
        !location ||
        !pricePerNight ||
        !maxGuests ||
        !houseRules ||
        images.length === 0 ||
        amenities.length === 0 ||
        !userId
      ) {
        setError("All fields are required.");
        return;
      }

      // Create FormData to send files and other data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("country", country);
      formData.append("city", city);
      formData.append("location", location);
      formData.append("pricePerNight", pricePerNight);
      formData.append("maxGuests", maxGuests);
      formData.append("houseRules", houseRules);
      formData.append("owner", userId); // Add owner ID
      formData.append("amenities", JSON.stringify(amenities)); // Convert amenities array to string

      images.forEach((image) => {
        formData.append("images", image); // Append each image file
      });

      // Submit property data
      const response = await fetch("/api/properties/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to list property");
      }

      const data = await response.json();
      setSuccess(data.message);
      setTitle("");
      setDescription("");
      setCountry("");
      setCity("");
      setLocation("");
      setPricePerNight("");
      setMaxGuests("");
      setHouseRules("");
      setImages([]);
      setImagePreviews([]);
      setAmenities([]);
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred while listing the property.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          rows={4}
          required
        />
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <input
          type="text"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          required
        />
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          required
        />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          required
        />
      </div>

      {/* Price Per Night */}
      <div>
        <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700">
          Price Per Night (£)
        </label>
        <input
          type="number"
          id="pricePerNight"
          value={pricePerNight}
          onChange={(e) => setPricePerNight(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          required
        />
      </div>

      {/* Max Guests */}
      <div>
        <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700">
          Number of Guests
        </label>
        <input
          type="number"
          id="maxGuests"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          required
        />
      </div>

      {/* House Rules */}
      <div>
        <label htmlFor="houseRules" className="block text-sm font-medium text-gray-700">
          House Rules
        </label>
        <textarea
          id="houseRules"
          value={houseRules}
          onChange={(e) => setHouseRules(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          rows={3}
          required
        />
      </div>

      {/* Images */}
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
          Images
        </label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
        />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {imagePreviews.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Amenities</label>
        <div className="mt-2 grid grid-cols-2 gap-4">
          {["WiFi", "Parking", "Pool", "Air Conditioning", "Gym", "Pet Friendly"].map((amenity) => (
            <div key={amenity} className="flex items-center">
              <input
                type="checkbox"
                id={amenity}
                value={amenity}
                onChange={handleAmenityChange}
                className="h-4 w-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
              />
              <label htmlFor={amenity} className="ml-2 text-sm text-gray-700">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
      >
        List Property
      </button>
    </form>
  );
}