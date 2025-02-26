// auth.js (Actualizado para usar el backend de TripleTen)

const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((err) => Promise.reject(err)); // Manejo de error detallado
    }
    return res.json();
  });
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject(err)); // Manejo de errores 400 y 401
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token); // ✅ Guardar token en localStorage
      return data;
    });
};

// ✅ Nueva función para verificar el token del usuario autenticado
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((err) => Promise.reject(err)); // Manejo de errores 400 y 401
    }
    return res.json();
  });
};
