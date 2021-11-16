import axios from "axios";

const APIBaseUrl = "http://todoapp-backend-service.todoapp";
const newTodoUrl = "https://en.wikipedia.org/wiki/Special:Random";
const axiosInstance = axios.create({
  baseURL: APIBaseUrl,
  timeout: 5000,
  headers: { "Access-Control-Allow-Origin": "*" },
});

const getWikiPage = async () => {
  try {
    const response = await axiosInstance.get(newTodoUrl);
    return response.request?.res?.responseUrl as string;
  } catch (error) {
    console.error(error);
  }
};

const createTodo = async () => {
  try {
    const page = await getWikiPage();
    await axiosInstance.post(APIBaseUrl, {
      text: `Read: < ${page} >`,
      done: false,
    });
    console.log(`A new daily todo (${page}) created successfully`);
  } catch (error) {
    console.error(error);
  }
};

createTodo()
  .then()
  .catch((error) => console.error(error));
