import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

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



// for form in creating an appointment

export const useFetchClientsInfo= () => {
 

  return useQuery({
      queryKey: ['clientInformation'],
      queryFn: api.fetchClientsInfo,
      onSuccess: (data) => {
          console.log("Fetched clients information:", data);
      },
      onError: (error) => {
          console.error("Error fetching clients information", error);
      },
     
  });
};


export const useUpdateStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: api.updateAppointmentStatus,
    onSuccess: (data) => {
        console.log("Successfully Updated the appointment", data);
        queryClient.invalidateQueries(['pendingAppointments']);
    },
    // You can add other callbacks like onError, onSettled, etc. if needed
  });
}


export const useFetchPendingAppointments = () => {
 

  return useQuery({
      queryKey: ['pendingAppointments'],
      queryFn: api.fetchPendingAppointments,
      onSuccess: (data) => {
          console.log("Fetched pending appointments successfully:", data);
      },
      onError: (error) => {
          console.error("Error fetching pending appointments:", error);
      },
      // You can add additional options here if needed
  });
};



export const useFetchAppointmentsQueueToday = () => {
 

  return useQuery({
      queryKey: ['queueAppointmentsToday'],
      queryFn: api.fetchAppointmentsQueueToday,
      onSuccess: (data) => {
          console.log("Fetched pending appointments successfully:", data);
      },
      onError: (error) => {
          console.error("Error fetching pending appointments:", error);
      },
      // You can add additional options here if needed
  });
};



