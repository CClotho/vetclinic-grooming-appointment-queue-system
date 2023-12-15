import { useMutation, useQuery , useQueryClient } from '@tanstack/react-query'; // You should import your queryClient instance
import * as api from '../../api/adminApi/pet';

export const useCreatePet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createPet,
    retry: 2,
    onSuccess: (data) => {
      console.log("Pet created successfully:", data);
      queryClient.invalidateQueries(['clientInformation'])
      
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
  const queryClient = useQueryClient();
  return useMutation({
 
    mutationFn: api.editPet,
    retry:2,
    onSuccess: (data) => {
      console.log("Pet edited successfully:", data);
      
      queryClient.invalidateQueries(['clientInformation']);
    },
    onError: (error) => {
      console.error("Error editing pet:", error);
    }
  });
};

export const useDeletePet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deletePet,
    onSuccess: (data) => {
      console.log("Pet deleted successfully:", data);
      queryClient.invalidateQueries(['clientInformation']);
      
    },
    onError: (error) => {
      console.error("Error deleting pet:", error);
    }
  });
};
