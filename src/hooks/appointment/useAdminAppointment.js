import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import * as api from '../../api/adminApi/appointment';

export const useCreateAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: api.createAppointment,
    onSuccess: (data) => {
      console.log("Appointment created successfully:", data);
     
       queryClient.invalidateQueries(['appointments']); 
       queryClient.invalidateQueries(['pendingAppointments']);
    },
    onError: (error) => {
      console.error("Error creating appointment:", error);
    }
  });
};


export const useUpdateAppointmentForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
  mutationFn: api.updateAppointmentForm,
  onSuccess: ( {id, data}) => {
    console.log("Appointment updated successfully:", { id, data});
   
     queryClient.invalidateQueries(['appointments']);
     queryClient.invalidateQueries(['pendingAppointments']);
  },
  onError: (error) => {
    console.error("Error updating appointment:", error);
  }
});
};




export const useDeleteQueueAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
  mutationFn: api.deleteQueueAppointment,
  onSuccess: (appointmentId) => {
      console.log("Successfully Updated the appointment", appointmentId);
      queryClient.invalidateQueries(['queueAppointmentsToday']);
  },
  // You can add other callbacks like onError, onSettled, etc. if needed
});
}





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



export const useFetchAppointmentsQueueToday = () => {
 

  return useQuery({
      queryKey: ['queueAppointmentsToday'],
      queryFn: api.fetchAppointmentsQueueToday,
      retry: 2,
      //refetchOnWindowFocus: true,
      refetchIntervalInBackground: true,
      onSuccess: (data) => {
          console.log("Fetched pending appointments successfully:", data);
      },
      onError: (error) => {
          console.error("Error fetching pending appointments:", error);
      },
      // You can add additional options here if needed
  });
};

export const useUpdateAppointmentsQueueToday= () => {
  const queryClient = useQueryClient();
  return useMutation({
  mutationFn: api.updateAppointmentQueueStatus,
  retry:2, 
  onSuccess: (data) => {
    console.log("Updated appointment queue status successfully:", data);
    queryClient.invalidateQueries('queueAppointmentsToday'); // did change here 11/21/2023 12;04am in invalidating queries
    },
    onError: (error) => {
        console.error("Error updating queue status:", error);
    },
  });
};



export const useFetchAppointmentList = () => {
 

  return useQuery({
      queryKey: ['AppointmentList'],
      queryFn: api.fetchAppointmentList,
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

