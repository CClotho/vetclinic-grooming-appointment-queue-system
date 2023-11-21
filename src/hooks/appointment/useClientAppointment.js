import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import * as api from '../../api/clientApi/appointment';

export const useRequestAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: api.requestAppointment,
    retry: 2,
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

export const useFetchClientAppointmentsQueue = () => {
  
  return useQuery({
    queryKey: ['AppointmentsQueueToday'],
    queryFn: api.fetchAppointmentQueueToday,
    retry: 2,
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
        console.log("Fetched appointments Queue for today:", data);
    },
    onError: (error) => {
        console.error("Error fetching appointments queue for today:", error);
    },
    
});
}

export const useFetchClientAppointmentsToday = () => {
 
  return useQuery({
    queryKey: ['AppointmentsToday'],
    queryFn: api.fetchAppointmentQueueToday,
    retry: 2,
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
        console.log("Fetched appointments Queue for today:", data);
        
    },
    onError: (error) => {
        console.error("Error fetching appointments queue for today:", error);
    },
    
});

}

export const useFetchClientPendingAppointments = () => {
 

  return useQuery({
      queryKey: ['pendingAppointments'],
      queryFn: api.fetchPendingAppointments,
      retry: 2,
      refetchOnWindowFocus: true,
      onSuccess: (data) => {
          console.log("Fetched pending appointments successfully:", data);
      },
      onError: (error) => {
          console.error("Error fetching pending appointments:", error);
      },
      // You can add additional options here if needed
  });
};