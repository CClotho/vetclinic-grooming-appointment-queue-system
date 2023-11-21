import { useMutation, useQuery ,useQueryClient} from '@tanstack/react-query';

import * as api from '../../api/sharedApi/treatment';
import * as adminApi from '../../api/adminApi/treatment';


export const useCreateTreatment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.createTreatment,
    retry: 2,
    onSuccess: (data) => {
      console.log("Treatment created successfully:", data);
      queryClient.invalidateQueries('treatments'); // updates real time lol.


      // Handle success, e.g., show a notification, redirect, etc.
      // If you have any queries that need to be invalidated or refetched, you can do that here.
      // For example:
      // queryClient.invalidateQueries('someQueryKey');
    },
    onError: (error) => {
      console.error("Error creating treatment:", error);
      // Handle error, e.g., show an error notification
    }
    
  });
};

export const useFetchTreatments = () => {
  return useQuery({queryKey:['treatments'], queryFn:api.fetchTreatments, retry: 1,});
};

export const useEditTreatment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.editTreatment,
    retry:2,
    onSuccess: (data) => {
      console.log("Treatment edited successfully:", data);
      // Invalidate and refetch any related queries if needed
      queryClient.invalidateQueries('treatments');
    },
    onError: (error) => {
      console.error("Error editing treatment:", error);
    }
  });
};



// ... other hooks for fetching, updating, deleting treatments if needed ...
