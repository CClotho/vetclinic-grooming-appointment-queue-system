import { useQuery } from "@tanstack/react-query";
import * as api from '../../api/sharedApi/grooming';


export const useFetchGroomingServices = () => {
    return useQuery({queryKey:['grooming'], queryFn:api.fetchGroomingServices, retry: 1,});
  };



  export const useFetchPetSizes = () => {
    return useQuery({queryKey:['petSizes'], queryFn:api.fetchPetSizes,retry: 1,});
    
  };

  