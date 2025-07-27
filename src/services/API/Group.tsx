import type {
  GroupResponse,
  GroupDelete,
  GroupView,
  GroupAdd,
  StudentUpdate,
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


export const addGroup  = async (data:GroupAdd)=>{
  const response  = await axiosInstance.post(GROUP_URLS.ADD_GROUP,data);
  return response.data;

};

export const UpdateGroup = async (id: string, data: GroupAdd) => {
  const response = await axiosInstance.put(GROUP_URLS.UPDATE_GROUP(id), data);
  return response.data;
};
