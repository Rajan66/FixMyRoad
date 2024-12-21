import { getAllReports, getReportDetail } from "@/apicalls/report";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAllReport = () => {
    const { data, isPending } = useQuery<ReportDetails>({
        queryKey: ["reports"],
        queryFn: () => getAllReports(),
        placeholderData: keepPreviousData,
    });
    return { data, isPending };
};

export const useGetReportDetails = (id: number) => {
    const { data, isPending } = useQuery<ReportDetails>({
        queryKey: ["reports", id],
        queryFn: () => getReportDetail(id),
    });

    return { data, isPending };
};
