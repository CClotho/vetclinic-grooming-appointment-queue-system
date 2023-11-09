import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from 'path-to-your-query-client'; // You should import your queryClient instance
import * as api from './api/pet';

export const useCreatePet = () => {
  return useMutation({
    mutationFn: api.createPet,
    onSuccess: (data) => {
      console.log("Pet created successfully:", data);
      // Invalidate and refetch any related queries if needed
      // queryClient.invalidateQueries('someQueryKey');
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
    onSuccess: (data) => {
      console.log("Pet edited successfully:", data);
      // Invalidate and refetch any related queries if needed
      // queryClient.invalidateQueries(['pet', data.id]);
    },
    onError: (error) => {
      console.error("Error editing pet:", error);
    }
  });
};

export const useDeletePet = () => {
  return useMutation({
    mutationFn: api.deletePet,
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
