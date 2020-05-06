const baseURL = 'http://localhost:3000/'
const headers = {
    headers: {
      Authorization: `Bearer ${(getUserObject() === null || getUserObject() === undefined) ? '' : getUserObject().token}`,
    },
  };
export default {baseURL, headers}