"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { districts } from "../constants";
import { Report, reportSchema } from "./report-schema";
type FormFields = {
  locationDetails: boolean;
  district?: string;
  metropolitanCity?: string;
  zipcode?: String;
  location?: string;
};

const LocationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Report>({
    defaultValues: {
      locationDetails: false,
    },
    resolver: zodResolver(reportSchema),
  });
  console.log(errors);
  // Watch the checkbox state
  const locationDetails = watch("locationDetails");

  // Form submission handler
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border-2 rounded-lg shadow-lg"
    >
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="locationDetails"
          {...register("locationDetails")}
          className="h-5 w-5 text-blue-600"
        />
        <label htmlFor="locationDetails" className="text-lg">
          Location Details
        </label>
      </div>

      {locationDetails && (
        <div className="mt-4 space-y-4 flex flex-col items-center border-b-2 rounded-lg border-gray-300 py-4">
          <div className="flex space-x-3 w-[40%] justify-between">
            {/* District */}
            <div>
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

            {/* VDC,Metro city selection hai */}

            <div>
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

          {/* woda number */}
          <div className="flex space-x-2 w-[40%] justify-between">
            <div>
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
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-lg font-medium">
                Area
              </label>
              <input
                type="text"
                id="location"
                {...register("location")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          {/* Upload photo */}
          <div className="flex items-center space-x-4">
            <label htmlFor="photo" className="text-lg font-medium mt-5">
              Upload photo
            </label>
            <input
              type="file"
              id="photo"
              className="block px-3 py-2 mt-5"
              accept="image/*"
            />
          </div>
          <div className="mt-5 w-full">
            <label
              htmlFor="message"
              className="flex text-lg font-medium items-center"
            >
              Short dispriction
            </label>
            <textarea
              id="message"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows={6}
              placeholder="Enter your message here..."
            ></textarea>
          </div>
          {errors.district && (
            <span className="text-red-500 text-sm">
              {errors.district.message}
            </span>
          )}
        </div>
      )}
      <div className="flex space-x-2 ]">
        <input
          type="checkbox"
          id="Map_view"
          className="h-5 w-5 text-blue-600"
        />
        <label htmlFor="Map_view" className="text-lg">
          Report using Map{" "}
          <a href="/viewmap" className="underline text-blue-600">
            Click here
          </a>
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default LocationForm;
