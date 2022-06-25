export default {
  setprofile: (payload) => {
    localStorage.setItem("profile", JSON.stringify(payload));
  },
  getprofile: () => {
    let result = localStorage.getItem("profile");
    return JSON.parse(result);
  },
  clearstorage: () => {
    localStorage.clear();
  },
};
