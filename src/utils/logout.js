export const logoutUser = () => {
  localStorage.removeItem("user");
  setInterval(() => {
    if (!localStorage.getItem("user")) {
      window.location.href = "/login";
    }
  }, 500);
};
