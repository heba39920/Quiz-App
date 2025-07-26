import type { GroupDelete, GroupResponse, GroupView } from "@/interface/GroupInterface";
import {
  DeleteGroup,
  fetchGroupById,
  FetchGroupList,
} from "@/services/API/Group";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
