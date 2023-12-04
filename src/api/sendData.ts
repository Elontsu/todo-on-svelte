import type { ITodo } from "../types/types";

export const sendData = async (url: string, body: {value: string} | ITodo) => {
  const reponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await reponse.json();
  return data;
}