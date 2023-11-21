import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getClientIds } from '../../api/adminApi/clients';
import * as api from '../../api/adminApi/clients';

// for form in creating an appointment

export const useFetchClientsInfo= () => {
 

    return useQuery({
        queryKey: ['clientInformation'],
        queryFn: api.fetchClientsInfo,
        retry: 2,
        onSuccess: (data) => {
            console.log("Fetched clients information:", data);
        },
        onError: (error) => {
            console.error("Error fetching clients information", error);
        },
       
    });
  };

  export const useGetClientById = (clientId) => {
    return useQuery({
      queryKey: ['clientInformation', clientId],
      queryFn: () => api.getClientIds(clientId),
      retry: false,
      onSuccess: (data) => {
        console.log("Successfully fetched client details:", data);
      },
      onError: (error) => {
        console.error("Error fetching client details", error);
      }
    });
  };
  


/*   
export const useGetClientsId = () => {
 

    return useQuery({
        queryKey: ['clientInformation'],
        queryFn: api.getClientIds,
        onSuccess: (data) => {
            console.log("Successfully fetched clients id:", data);
        },
        onError: (error) => {
            console.error("Error fetching clients id", error);
        },
       
    });
  }; */