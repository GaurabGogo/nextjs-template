import apiService from "../apiService";

export const fetchAllUsers = async (queryObj = {}) => {
  const response = await apiService.get(`users/all`, queryObj);
  return response;
};
