"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { SubmitHandler, useForm } from "react-hook-form";

// Define the form fields type
type FormFields = {
  photo: FileList;
  message: string;
  location: string;
};

const CustomForm: React.FC = () => {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(
    null
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>();

  // Function to fetch user's location
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setValue("location", `${latitude}, ${longitude}`); // Automatically populate location textbox
        },
        (error) => {
          console.error("Error fetching location:", error); // Log full error object
          console.error(
            "Error fetching location:",
            error.message || "Unable to retrieve location"
          );
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  // Form submission handler
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  // Component to handle map clicks
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setUserLocation([lat, lng]);
        setValue("location", `${lat}, ${lng}`);
      },
    });

    return userLocation ? <Marker position={userLocation} /> : null;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border-2 rounded-lg shadow-lg space-y-6"
    >
      {/* Upload Photo */}
      <div className="flex flex-col">
        <label htmlFor="photo" className="text-lg font-medium">
          Upload Photo
        </label>
        <input
          type="file"
          id="photo"
          {...register("photo", { required: "Photo is required" })}
          className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          accept="image/*"
        />
        {errors.photo && (
          <span className="text-red-500 text-sm">{errors.photo.message}</span>
        )}
      </div>

      {/* Message Box */}
      <div className="flex flex-col">
        <label htmlFor="message" className="text-lg font-medium">
          Message
        </label>
        <textarea
          id="message"
          {...register("message", {
            required: "Message is required",
            maxLength: {
              value: 500,
              message: "Message must not exceed 500 characters",
            },
          })}
          className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={6}
          placeholder="Enter your message here..."
        ></textarea>
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message.message}</span>
        )}
      </div>

      {/* Location Input */}
      <div className="flex flex-col">
        <label htmlFor="location" className="text-lg font-medium">
          Location
        </label>
        <input
          type="text"
          id="location"
          {...register("location", {
            required: "Location is required",
          })}
          placeholder="Select a location on the map"
          className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          readOnly
        />
        {errors.location && (
          <span className="text-red-500 text-sm">
            {errors.location.message}
          </span>
        )}
      </div>

      {/* Map */}
      <div className="mt-6">
        <label className="text-lg font-medium">Select Location</label>
        <div className="mt-4 h-[600px] w-[600px] border-2 border-gray-300 rounded-lg overflow-hidden">
          <MapContainer
            center={userLocation || [27.7172, 85.324]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default CustomForm;
