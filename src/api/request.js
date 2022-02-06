// 對於axios進行二次封裝
import axios from 'axios';
// 利用axios對象的方法create，去創建一個axios先例
// request就是axios ，只不過稍微配置一下
const requests = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000,
});
// 請求攔截器: 在發請求之前，請求攔截器可以檢測到，可以在請求發出去之前做一些事情

requests.interceptors.request.use((config) =>
  // config :配置對象，對象裡面有一個屬性很重要，header請求頭
  config);
// 響應攔截器
requests.interceptors.response.use(
  (res) => Promise.resolve(res),
  (error) => Promise.reject(new Error(error)),
);
export default requests;
