import axios from 'axios';

const api = axios.create({
  baseURL: "https://surfadvisor-api.onrender.com", //"http://localhost:3000",
  withCredentials: true, //Permite o envio automático de cookies!
});

api.interceptors.request.use(
  (response) => response,
  (error) => {
    if(error.response && error.response.status === 401) {
      localStorage.removeItem("isLoggedIn"); // Destrói a flag
      window.location.href = "/login"; // Chuta para a tela inicial
    }
  }

)

export default api;
