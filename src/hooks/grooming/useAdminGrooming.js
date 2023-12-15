import * as adminApi from '../../api/adminApi/grooming';
import * as api from '../../api/sharedApi/grooming';
import { useMutation, useQuery ,useQueryClient} from '@tanstack/react-query';



export const useCreateGrooming = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.createGrooming,
    retry: 2,
    onSuccess: (data) => {
      console.log("Grooming service created successfully:", data);
      queryClient.invalidateQueries('grooming'); // updates real time lol.


      // For example:
      // queryClient.invalidateQueries('someQueryKey');
    },
    onError: (error) => {
      console.error("Error creating grooming service:", error);
      // Handle error, e.g., show an error notification
    }
    
  });
};

export const useEditGrooming = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.editGrooming,
    retry:2,
    onSuccess: (data) => {
      console.log("Grooming edited successfully:", data);
      // Invalidate and refetch any related queries if needed
      queryClient.invalidateQueries('grooming');
    },
    onError: (error) => {
      console.error("Error editing grooming:", error);
    }
  });
};


export const useDeleteGrooming = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.deleteGrooming,
    onSuccess: (data) => {
      console.log("Grooming service deleted successfully:", data);
      queryClient.invalidateQueries(['grooming']);
      
    },
    onError: (error) => {
      console.error("Error deleting pet:", error);
    }
  });
};

