import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as api from '../../api/adminApi/appointment';

export const useCreateAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: api.createAppointment,
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
