"use client";

import { useSearchParams } from "next/navigation";
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

const PropertiesListPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const location = searchParams?.get("location") || "";

  useEffect(() => {
    const fetchProperties = async () => {
      if (!location) return;

      try {
        let res = await fetch(`/api/properties/getProperties?location=${encodeURIComponent(location)}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 401) {
          console.log("Access token expired. Attempting to refresh...");

          // Attempt to refresh the token
          const refreshRes = await fetch(`/api/refresh-token`, {
            method: "POST",
            credentials: "include", // Include cookies in the request
          });

          if (!refreshRes.ok) {
            throw new Error("Failed to refresh token");
          }

          const { accessToken } = await refreshRes.json();
          localStorage.setItem("token", accessToken);

          // Retry the original request with the new token
          res = await fetch(`/api/properties/getProperties?location=${encodeURIComponent(location)}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        }

        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Properties in {location}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={property.images?.[0] || "/placeholder.jpg"}
                alt={property.title || "Property Image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{property.title}</h2>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-gray-800 font-bold mt-2">£{property.pricePerNight} / night</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No properties found in {location}.</p>
        )}
      </div>
    </div>
  );
};

export default PropertiesListPage;