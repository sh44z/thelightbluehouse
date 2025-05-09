"use client";

import { useEffect, useState } from "react";

interface Property {
  _id: string;
  images: string[];
  country: string;
  location: string;
  city: string;
  pricePerNight: number;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties/allProperties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load properties. Please try again later.");
      }
    };

    fetchProperties();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Property Image */}
            <img
              src={property.images[0] || "/placeholder.jpg"}
              alt={property.location}
              className="w-full h-48 object-cover"
            />

            {/* Property Details */}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{property.location}</h2>
              <p className="text-sm text-gray-600">
                {property.city}, {property.country}
              </p>
              <p className="text-sm font-medium text-gray-800 mt-2">
                £{property.pricePerNight} / night
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}