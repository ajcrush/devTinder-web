import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constant";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/", { path: "/api/socket.io" }); // Corrected the path by removing the extra closing brace
  }
};
