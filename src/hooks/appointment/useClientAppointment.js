import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import * as api from '../../api/clientApi/appointment';

export const useRequestAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: api.requestAppointment,
    onSuccess: (data) => {
      console.log("Appointment created successfully:", data);
      // Invalidate and refetch any related queries if needed
      // For example, if you have a list of appointments:
       queryClient.invalidateQueries('appointments');
    },
    onError: (error) => {
      console.error("Error creating appointment:", error);
    }
  });
};