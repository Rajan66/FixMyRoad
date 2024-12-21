import { getAllComplaints, getComplaintDetail } from "@/apicalls/complaint";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAllComplaint = () => {
    const { data, isPending } = useQuery<ComplaintDetails>({
        queryKey: ["complaints"],
        queryFn: () => getAllComplaints(),
        placeholderData: keepPreviousData,
    });
    return { data, isPending };
};

export const useGetComplaintDetails = (id: number) => {
    const { data, isPending } = useQuery<ComplaintDetails>({
        queryKey: ["complaints", id],
        queryFn: () => getComplaintDetail(id),
    });

    return { data, isPending };
};
