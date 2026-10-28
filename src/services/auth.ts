import api from "@/lib/api";

export async function loginUser(data: { email: string; password: string }) {
  const response = await api.post("/REPLACE_WITH_LOGIN_ENDPOINT", data);
  return response.data;
}
