import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import * as api from '../../api/clientApi/profile';


export const useGetProfile = () => {
 

    return useQuery({
        queryKey: ['clientProfile'],
        queryFn: api.getProfile,
        retry: 2,
        onSuccess: (data) => {
            console.log("Fetched profile details successfully:", data);
        },
        onError: (error) => {
            console.error("Error fetching profile details:", error);
        },
        // You can add additional options here if needed
    });
  };
  