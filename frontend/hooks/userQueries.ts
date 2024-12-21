// import { getAllUsers, getUserDetails } from "@/apicalls/users";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";

// export const useGetAllUsers = (
//     token: string | undefined
// ) => {
//     const { data, isPending } = useQuery<UserDetails>({
//         queryKey: ["users"],
//         queryFn: () => getAllUsers(token),
//         placeholderData: keepPreviousData,
//     });
//     return { data, isPending };
// };

// export const useGetUserDetails = (id: number, token: string | undefined) => {
//     const { data, isPending } = useQuery<UserDetails>({
//         queryKey: ["users", id],
//         queryFn: () => getUserDetails(id, token),
//     });

//     return { data, isPending };
// };
