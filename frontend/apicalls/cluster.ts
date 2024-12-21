import {
    DeleteRequest,
    GetRequest,
    PatchRequest,
    PostRequest,
    PutRequest,
} from "@/lib/axios/client/axios";

export const createComplaint = async (data: {
    data: any;
    token: string | undefined;
}) => {
    try {
        const response = await PostRequest(
            `/api/cluster`,
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

export const getAllComplaints = async () => {
    try {
        const response = await GetRequest(
            `/api/cluster`,
            { },
            {
                headers: {},
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};

export const getComplaintDetail = async (id: number) => {
    try {
        const response = await GetRequest(
            `/api/cluster/${id}`,
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

export const updateComplaint = async (data: {
    id: number | undefined;
    data: any;
    token: string | undefined;
}) => {
    try {
        console.log(data);
        const response = await PatchRequest(
            `/api/cluster/${data.id}`,
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

export const deleteCluster = async (data: {
    id: number;
    token: string | undefined;
}) => {
    try {
        const response = await DeleteRequest(`/api/cluster/${data.id}`, {
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};
