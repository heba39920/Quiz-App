import type {
  GroupResponse,
  GroupDelete,
  GroupView,
} from "@/interface/GroupInterface";
import { axiosInstance, GROUP_URLS } from "../EndPoints/EndPoints";


export const FetchGroupList = async () => {
  const response = await axiosInstance.get<GroupResponse>(
    GROUP_URLS.GET_GROUP_LIST
  );
  return response.data;
};

export const DeleteGroup = async (id: string) => {
  const response = await axiosInstance.delete<GroupDelete>(
    GROUP_URLS.DELETE_GROUP(id)
  );
  return response.data;
};

export const fetchGroupById = async (id: string): Promise<GroupView> => {
  const response = await axiosInstance.get(GROUP_URLS.VIEW_GROUP(id));
  return response.data;
};
