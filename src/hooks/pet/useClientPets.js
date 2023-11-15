import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import * as api from '../../api/clientApi/pet';



export const useFetchClientPet= () => {
 

    return useQuery({
        queryKey: ['clientInformation'],
        queryFn: api.fetchClientPet,
        onSuccess: () => {
            console.log("Fetched pets");
        },
        onError: (error) => {
            console.error("Error fetching pets", error);
        },
       
    });
  };