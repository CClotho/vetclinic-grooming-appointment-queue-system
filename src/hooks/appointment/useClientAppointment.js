import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import * as api from '../../api/clientApi/appointment';

export const useRequestAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: api.requestAppointment,
    retry: 2,
    onSuccess: (data) => {
      console.log("Appointment created successfully:", data);
      
       queryClient.invalidateQueries(['appointments']);
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
    refetchInterval: 5000, // added this refetch so when resumed and stop timer is clicked client side gets updated
    onSuccess: (data) => {
        console.log("Fetched appointments Queue for today:", data);
    },
    onError: (error) => {
        console.error("Error fetching appointments queue for today:", error);
    },
    
});
}



export const useFetchAppointmentHistory = () => {
 

  return useQuery({
      queryKey: ['AppointmentHistory'],
      queryFn: api.fetchAppointmentHistory,
      retry: 2,
      onSuccess: (data) => {
          console.log("Fetched pending appointments successfully:", data);
      },
      onError: (error) => {
          console.error("Error fetching pending appointments:", error);
      },
      // You can add additional options here if needed
  });
};

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
      refetchInterval: 5000,
      onSuccess: (data) => {
          console.log("Fetched pending appointments successfully:", data);
        
      },
      onError: (error) => {
          console.error("Error fetching pending appointments:", error);
      },
      // You can add additional options here if needed
  });
};
