import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getClientIds } from '../../api/adminApi/clients';
import * as api from '../../api/adminApi/clients';

// for form in creating an appointment

export const useFetchClientsInfo= () => {
  

    return useQuery({
        queryKey: ['clientInformation'],
        queryFn: api.fetchClientsInfo,
        
        retry: 2,
        refetchIntervalInBackground: true,
        onSuccess: (data) => {
            console.log("Fetched clients information:", data);
        },
        onError: (error) => {
            console.error("Error fetching clients information", error);
        },
       
    });
  };

  export const useGetClientById = (clientId) => {
    const queryClient = useQueryClient()
    return useQuery({
      queryKey: ['clientInformation', clientId],
      queryFn: () => api.getClientIds(clientId),
      retry: false,
      onSuccess: (data) => {
        console.log("Successfully fetched client details:", data);
        queryClient.invalidateQueries(['clientInformation'])
      },
      onError: (error) => {
        console.error("Error fetching client details", error);
      }
    });
  };

  export const useEditClientInfo = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: api.editClientInformation,
      onSuccess: (data) => {
        console.log("Successfully edited client data:", data);
        queryClient.invalidateQueries(['clientInformation']); // updates real time lol.
  
 
      },
      onError: (error) => {
        console.error("Error editing client's data:", error);
    
      }
      
    });
  };

  
  export const useResetClientPassword= () => {
    return useMutation({
      mutationFn: api.resetClientPassword,
      onSuccess: (data) => {
        console.log("Successfully reset password:", data);
       
 
      },
      onError: (error) => {
        console.error("Error resetting password", error);
    
      }
      
    });
  };
  
  
  export const useDeleteClient= () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: api.deleteClient,
      onSuccess: (data) => {
        console.log("Successfully edited client data:", data);
        queryClient.invalidateQueries(['clientInformation']); // updates real time lol.
  
 
      },
      onError: (error) => {
        console.error("Error editing client's data:", error);
    
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