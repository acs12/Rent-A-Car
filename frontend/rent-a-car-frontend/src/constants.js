let URL = 'http://localhost:3000';
const headers = {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("token") === null ||
        localStorage.getItem("token") === undefined
          ? ""
          : localStorage.getItem("token")
      }`
    }
  };
export {URL, headers};