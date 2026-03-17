import { client } from "./api";

export const listUser = async () => {
    return client.get("/users")
}