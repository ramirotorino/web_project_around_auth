// auth.js (Actualizado para usar el backend de TripleTen)

const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

const handleResponse = (res) => {
  if (!res.ok) {
    return res.json().then((err) => {
      console.error("Error en la API:", err.message || res.statusText); // ✅ No exponer detalles sensibles
      return Promise.reject("Ocurrió un error. Intenta nuevamente.");
    });
  }
  return res.json();
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
      localStorage.setItem("token", data.token); // ✅ Guardar token en localStorage
      return data;
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
