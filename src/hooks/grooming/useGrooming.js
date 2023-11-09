import { useQuery } from "@tanstack/react-query";
import * as api from '../../api/adminApi/grooming';


export const useFetchGroomingServices = () => {
    return useQuery({queryKey:['grooming'], queryFn:api.fetchGroomingServices});
  };