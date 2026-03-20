import { client } from "./api";

export const listUser = async () => {
  return client.get("/users");
};

export const createUser = async (form) => {
  return client.post("/user", form);
};
