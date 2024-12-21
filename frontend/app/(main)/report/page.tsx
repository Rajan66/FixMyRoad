"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { districts } from "../../../constants";
import { Report, reportSchema } from "./report-schema";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { set } from "zod";

type FormFields = {
  district?: string;
  metropolitanCity?: string;
  zipcode?: string;
  area?: string;
  locationName?: string;
};

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ChangeMapView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 13);
  }, [coords, map]);
  return null;
}

const MapClickHandler = ({
  setLocation,
}: {
  setLocation: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
      address?: string;
    } | null>
  >;
}) => {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        setLocation({
          lat,
          lng,
          address: data.display_name,
        });
        // console.log(., "sdasdasd");
        toast.success(`Location selected: ${lat}, ${lng}`);
      } catch (error) {
        setLocation({ lat, lng });
        toast.info(`Location selected: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    },
  });
  return null;
};

const LocationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Report>({
    defaultValues: {},
    resolver: zodResolver(reportSchema),
  });

  const [mapCenter, setMapCenter] = useState<[number, number]>([
    27.700769, 85.30014,
  ]); // Default to Kathmandu
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    address?: string;
  } | null>({ lat: mapCenter[0], lng: mapCenter[1] });
  const [loading, setLoading] = useState(true);
  console.log(location?.address, "data is here");
  console.log("useEffect is running...");
  useEffect(() => {
    console.log("Inside useEffect...");
    if (navigator.geolocation) {
      console.log("Geolocation is supported.");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position, "Geolocation position fetched.");
          const userLocation: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          async function getLocation() {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation[0]}&lon=${userLocation[1]}`
            );
            const data = await response.json();

            setLocation({
              lat: userLocation[0],
              lng: userLocation[1],
              address: data.display_name,
            });
          }
          getLocation();
          console.log(userLocation);
          setMapCenter(userLocation);
          setLoading(false);
          toast.success(userLocation.toString());
        },
        (error) => {
          console.error("Error fetching location:", error);
          setMapCenter([27.700769, 85.30014]); // Default to Kathmandu
          setLoading(false);
          toast.error(
            "Could not fetch your location. Default location is being used."
          );
        }
      );
    } else {
      console.log("Geolocation is not supported.");
      setMapCenter([27.700769, 85.30014]);
      setLoading(false);
      toast.error("Geolocation is not supported by your browser.");
    }
  }, []);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log({ ...data, location });
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full sm:w-4/5 lg:w-1/2 xl:w-1/3">
        <ToastContainer />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 border-2 rounded-lg shadow-lg"
        >
          <div className="mt-4 space-y-4 flex flex-col items-center border-b-2 rounded-lg border-gray-300 py-4">
            {/* District & City */}
            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-full sm:justify-between w-full">
              <div className="w-full sm:w-1/2">
                <label htmlFor="district" className="block text-lg font-medium">
                  District
                </label>
                <select
                  id="district"
                  {...register("district")}
                  defaultValue="Kathmandu"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                <label
                  htmlFor="metropolitanCity"
                  className="block text-lg font-medium"
                >
                  City
                </label>
                <input
                  type="text"
                  id="metropolitanCity"
                  placeholder="Kathmandu"
                  {...register("metropolitanCity")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Zip Code & Area */}
            <div className="flex flex-col sm:flex-row sm:space-x-2 w-full sm:w-full sm:justify-between mt-4">
              <div className="w-full sm:w-1/2">
                <label htmlFor="zipcode" className="block text-lg font-medium">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipcode"
                  {...register("zipcode")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                <label htmlFor="area" className="block text-lg font-medium">
                  Area
                </label>
                <input
                  type="text"
                  id="area"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Location Name */}
            <div className="w-full sm:w-1/2 mt-4">
              <label
                htmlFor="locationName"
                className="block text-lg font-medium"
              >
                Location Name
              </label>
              <input
                type="text"
                id="locationName"
                placeholder="e.g., Basantapur Durbar Square"
                value={location?.address || ""}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
              />
            </div>

            {/* Upload Photo */}
            <div className="flex items-center space-x-4 mt-5 w-full">
              <label
                htmlFor="photo"
                className="text-lg font-medium w-full sm:w-auto"
              >
                Upload Photo
              </label>
              <input
                type="file"
                id="photo"
                className="block px-3 py-2 w-full sm:w-auto"
                accept="image/*"
              />
            </div>

            {/* Short Description */}
            <div className="mt-5 w-full">
              <label
                htmlFor="message"
                className="flex text-lg font-medium items-center"
              >
                Short Description
              </label>
              <textarea
                id="message"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Enter your message here..."
              ></textarea>
            </div>
          </div>

          {/* Map Section */}
          <div className="h-64 sm:h-96 mt-4 w-full border-2 border-gray-300 rounded-lg overflow-hidden">
            {!loading ? (
              <MapContainer
                center={mapCenter}
                zoom={13}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {location && (
                  <Marker
                    position={[location.lat, location.lng]}
                    icon={markerIcon}
                  />
                )}
                <MapClickHandler setLocation={setLocation} />
                <ChangeMapView coords={mapCenter} />
              </MapContainer>
            ) : (
              <div className="text-center py-10">Loading map...</div>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationForm;
