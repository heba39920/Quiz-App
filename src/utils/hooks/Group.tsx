import type { GroupAdd, GroupDelete, GroupResponse, GroupView } from "@/interface/GroupInterface";
import {
  addGroup,
  DeleteGroup,
  fetchGroupById,
  FetchGroupList,
  UpdateGroup,
} from "@/services/API/Group";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { data } from "react-router-dom";
import { toast } from "react-toastify";
import { string } from "zod";

export const useGroup = () => {
  return useQuery<GroupResponse>({
    queryFn: FetchGroupList,
    queryKey: ["GroupList"],
  });
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => DeleteGroup(id),
    onSuccess: (data: GroupDelete) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["GroupList"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useGroupDetails = (id: string, enabled = true) => {
  return useQuery<GroupView>({
    queryKey: ["group", id],
    queryFn: () => fetchGroupById(id),
    enabled: !!id && enabled,
    retry: false,
  });
};


export const useAddGroup=()=>{
  const queryClient = useQueryClient ();

  return useMutation ({
    mutationFn  : (data:GroupAdd)=> addGroup(data),
     onSuccess: () => {
      toast.success("Group added successfully!");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add group");
    },
  });
};


export const useUpdateGroup =()=>{
  const queryClient = useQueryClient ();

  return useMutation ({
     mutationFn: ({ id, data }: { id: string; data: GroupAdd }) => UpdateGroup(id, data),
     onSuccess: () => {
      toast.success("Group updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update group");
    },
  });
};