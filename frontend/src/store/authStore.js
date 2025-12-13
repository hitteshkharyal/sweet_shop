export const auth = {
  login: (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  },

  isLoggedIn: () => !!localStorage.getItem("token"),

  isAdmin: () => localStorage.getItem("role") === "admin"
};
