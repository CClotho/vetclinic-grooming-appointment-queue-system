import { useMutation, useQuery , useQueryClient } from '@tanstack/react-query'; // You should import your queryClient instance
import * as api from '../../api/adminApi/pet';

export const useCreatePet = () => {
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createPet,
    retry: 2,
    onSuccess: (data) => {
      console.log("Pet created successfully:", data);
      // Invalidate and refetch any related queries if needed
       queryClient.invalidateQueries('someQueryKey');
    },
    onError: (error) => {
      console.error("Error creating pet:", error);
    }
  });
};

export const useFetchPet = (id) => {
  return useQuery(['pet', id], () => api.fetchPet(id));
};

export const useEditPet = () => {
  return useMutation({
    
    mutationFn: api.editPet,
    retry:2,
    onSuccess: (data) => {
      console.log("Pet edited successfully:", data);
      // Invalidate and refetch any related queries if needed
      //queryClient.invalidateQueries(['pet', data.id]);
    },
    onError: (error) => {
      console.error("Error editing pet:", error);
    }
  });
};

export const useDeletePet = () => {
  return useMutation({
    mutationFn: api.deletePet,
    retry: 2,
    onSuccess: (data) => {
      console.log("Pet deleted successfully:", data);
      // Invalidate and refetch any related queries if needed
      // queryClient.invalidateQueries('someQueryKey');
    },
    onError: (error) => {
      console.error("Error deleting pet:", error);
    }
  });
};