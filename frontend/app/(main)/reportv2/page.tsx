"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputBox from "@/components/InputBox";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReport } from "@/apicalls/report";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TReport, ReportSchema } from "@/schemas/reportSchema";
import TextAreaBox from "@/components/TextAreaBox";

import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { districts } from "../../../constants";

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
                toast.error(`Location selected: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
            }
        },
    });
    return null;
};

const page = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const session = useSession();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<TReport>({
        resolver: zodResolver(ReportSchema),
        mode: "onChange",
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
    const { mutate, isPending } = useMutation({
        mutationFn: createReport,
        onSettled(apiData: any) {
            console.log(apiData)
            if (apiData?.status === 201) {
                queryClient.invalidateQueries({ queryKey: ["reports"] });
                toast.success("Report Created Successfully");
                reset();
                router.push("/");
            }
            if (apiData.response.status === 422) {
                toast.error("Please fill all the required Fields");
            }
        },
    });

    const onSubmit = async (data: TReport) => {
        const { image, description, severity, area } = data;

        // Prepare the report data object
        const reportData: any = {
            address: { area },
            severity,
            description: description || "",
            image: image || ""
        };

        // Convert image to base64 if it exists
        // if (image?.length) {
        //     const imageBase64 = await convertToBase64(image[0]);
        //     reportData.image = imageBase64;
        // }

        // Add the token from the session
        const token = session?.data?.user?.access_token;
        if (token) {
            reportData.token = token;
        }

        console.log("Report Data:", reportData);

        try {
            await mutate(reportData);  // Use mutate for triggering the request
        } catch (error) {
            console.error("Error submitting report:", error);
            toast.error("Failed to submit the report.");
        }
    };

    // Helper function to convert image to base64
    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full sm:w-4/5 lg:w-1/2 xl:w-1/3">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 border-2 rounded-lg shadow-lg"
                >
                    <div className="mt-4 space-y-4 flex flex-col items-center border-b-2 rounded-lg border-gray-300 py-4">
                        <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-full sm:justify-between w-full">
                            <div className="w-full sm:w-1/2">
                                <label htmlFor="district" className="block text-lg font-medium">
                                    District
                                </label>
                                <select
                                    id="district"
                                    defaultValue="Kathmandu"
                                    className="mt-1 block w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                                    className="mt-1 block w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:space-x-2 w-full sm:w-full sm:justify-between mt-4">
                            <div className="w-full sm:w-1/2">
                                <label htmlFor="zipcode" className="block text-lg font-medium">
                                    Zip Code
                                </label>
                                <input
                                    type="text"
                                    id="zipcode"
                                    className="mt-1 block w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                                <label htmlFor="area" className="block text-lg font-medium">
                                    Area*
                                </label>
                                <InputBox<TReport>
                                    name="area"
                                    id="area"
                                    placeholder="Ason, Nayabazar etc..."
                                    register={register}
                                    error={(errors && errors?.area?.message?.toString()) || ""}
                                    className="mt-1 block w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    desc="enter the area"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-2 w-full sm:w-full sm:justify-between mt-4">
                            <div className="w-full sm:w-1/2 mt-4 sm:mt-0">

                                <label htmlFor="area" className="block text-lg font-medium">
                                    Severity*
                                </label>
                                <InputBox<TReport>
                                    name="severity"
                                    id="severity"
                                    placeholder="minor, moderate or high"
                                    register={register}
                                    error={(errors && errors?.severity?.message?.toString()) || ""}
                                    desc="enter the severity"
                                    className="mt-1 block w-full h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"

                                />
                            </div>

                        </div>
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
                        <InputBox<TReport>
                            name="image"
                            id="image"
                            placeholder="Image"
                            register={register}
                            error={(errors && errors?.image?.message?.toString()) || ""}
                            desc="enter the  image"
                            label="Image*"
                        />
                        <div className="mt-5 w-full">
                            <label
                                htmlFor="message"
                                className="flex text-lg font-medium items-center"
                            >
                                Short Description
                            </label>
                            <TextAreaBox<TReport>
                                name="description"
                                id="description"
                                placeholder="Description"
                                register={register}
                                error={(errors && errors?.description?.message?.toString()) || ""}
                                desc="enter the description"
                            />
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
                        <Button type="submit" className="px-5 py-2.5 my-auto text-[16px] w-[200px] h-[40px] font-medium text-white rounded-md  border-r-0 ">
                            {isPending ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="size-5 animate-spin" />
                                    <p>Creating..</p>
                                </div>
                            ) : (
                                "Create Report"
                            )}
                        </Button>
                    </div>
                    {/* <ImageUpload control={control} errors={errors} token={session?.data?.user?.access_token} /> */}
                </form>
            </div>
        </div>
    );
};

export default page;
