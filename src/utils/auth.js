// auth.js (Actualizado para usar el backend de TripleTen)

const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

const handleResponse = (res) => {
  return res.json().then((data) => {
    if (!res.ok) {
      console.error("Error en la API:", data);
      return Promise.reject(data.error || "Ocurrió un error inesperado.");
    }
    return data;
  });
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((data) => {
      if (data.token && data.user) {
        console.log("Token recibido y guardado:", data.token);
        localStorage.setItem("token", data.token);
        return { token: data.token, user: data.user }; // Return token and user data
      } else {
        return Promise.reject("No se recibió un token de autenticación.");
      }
    });
};

export const checkToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("No token found");

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};
