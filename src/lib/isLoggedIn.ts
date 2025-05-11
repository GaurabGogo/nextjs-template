import { getAccessToken } from "./actions";

export const isLoggedIn = async () => {
  const token = await getAccessToken();
  console.log("token", token);
  return !!token;
};
