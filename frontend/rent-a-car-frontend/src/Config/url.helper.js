const baseURL = 'http://application-load-balancer-824152353.us-east-1.elb.amazonaws.com:3000/'
const headers = {
    headers: {
      Authorization: `Bearer ${(getUserObject() === null || getUserObject() === undefined) ? '' : getUserObject().token}`,
    },
  };
export default {baseURL, headers}