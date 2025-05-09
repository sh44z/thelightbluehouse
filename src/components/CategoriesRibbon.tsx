"use client";

import { useEffect, useState } from "react";

interface Property {
  _id: string;
  title: string;
  images: string[];
  country: string;
  location: string;
  city: string;
  pricePerNight: number;
}

const CategoriesRibbon = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    const fetchLocationsAndProperties = async () => {
      try {
        // Fetch locations
        const locationsRes = await fetch("/api/properties/locations");
        if (!locationsRes.ok) {
          throw new Error("Failed to fetch locations");
        }
        const locationsData = await locationsRes.json();
        setLocations(locationsData);

        // Fetch all properties
        const propertiesRes = await fetch("/api/properties/getProperties");
        if (!propertiesRes.ok) {
          throw new Error("Failed to fetch properties");
        }
        const propertiesData = await propertiesRes.json();
        setProperties(propertiesData);
        setFilteredProperties(propertiesData); // Initially show all properties
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchLocationsAndProperties();
  }, []);

  return (
    <div>
      {/* Categories Ribbon */}
      <div className="bg-white shadow-md fixed top-[110px] w-full z-10 flex justify-center">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex space-x-4 overflow-x-auto">
          {locations.map((location) => (
            <button
              key={location}
              className="text-gray-700 hover:text-cyan-500 focus:outline-none text-sm font-bold"
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesRibbon;