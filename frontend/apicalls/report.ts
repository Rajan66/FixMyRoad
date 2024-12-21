import {
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/client/axios";

export const createReport = async (data: {
  address: { area: string };
  severity: string;
  description: string;
  image: string; // Base64 encoded image
  token: string;
}) => {
  try {
    const response = await PostRequest(
      `/api/reports`, // API endpoint
      data, // Send the data as JSON
      {
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
          Authorization: `Bearer ${data.token}`, // Token from request data
        },
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to submit report.");
  }
};

export const getAllReports = async () => {
  try {
    const response = await GetRequest(
      `/api/reports`,
      {},
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getReportDetail = async (id: number) => {
  try {
    const response = await GetRequest(
      `/api/reports/${id}`,
      {},
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const updateReport = async (data: {
  id: number | undefined;
  data: any;
  token: string | undefined;
}) => {
  try {
    console.log(data);
    const response = await PatchRequest(
      `/api/reports/${data.id}`,
      { ...data.data },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const deleteReport = async (data: {
  id: number;
  token: string | undefined;
}) => {
  try {
    const response = await DeleteRequest(`/api/reports/${data.id}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
