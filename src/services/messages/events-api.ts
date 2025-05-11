import apiService from "../apiService";

export const fetchAllMessages = async (
  conversationId: string,
  queryObj = {}
) => {
  const response = await apiService.get(
    `messages/conversations/${conversationId}/messages`,
    queryObj
  );
  return response;
};
