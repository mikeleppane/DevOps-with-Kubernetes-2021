import { create } from "apisauce";

const api = create({
  baseURL: `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`,
  timeout: 5000,
});

export const sendMessageToTeleGram = (message: string) => {
  api
    .post("/sendMessage", {
      chat_id: Number(process.env.TELEGRAM_CHAT_ID),
      text: message,
    })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
};
