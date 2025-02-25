export const register = (email, password) => {
  return fetch("https://api.example.com/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)));
};

export const login = (email, password) => {
  return fetch("https://api.example.com/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .then((data) => {
      localStorage.setItem("token", data.token);
      return data;
    });
};
