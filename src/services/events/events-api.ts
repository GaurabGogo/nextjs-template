import apiService from "../apiService";

export const fetchAllEvents = async (queryObj = {}) => {
  const response = await apiService.get(`events/all`, queryObj);
  return response;
};
