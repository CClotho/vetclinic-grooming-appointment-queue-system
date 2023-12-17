import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import * as api from '../../api/clientApi/pet';



export const useFetchClientPet= () => {
 

    return useQuery({
        queryKey: ['clientProfile'],
        queryFn: api.fetchClientPet,
        retry: 2,
        refetchIntervalInBackground: true,
        onSuccess: () => {
            console.log("Fetched pets");
        },
        onError: (error) => {
            console.error("Error fetching pets", error);
        },
       
    });
  };