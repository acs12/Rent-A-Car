let URL = 'http://application-load-balancer-824152353.us-east-1.elb.amazonaws.com:3000';
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