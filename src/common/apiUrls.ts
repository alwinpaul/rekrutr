// const get_domain = "http://api-tectalent.eastus.cloudapp.azure.com";
const get_domain = process.env.REACT_APP_PORTAL_DOMAIN;

const apiUrls = {
  GET_CONFIG: `${get_domain}/api/config`,
  ADD_CANDIDATE: `${get_domain}/api/candidates`,
  GET_CANDIDATES: `${get_domain}/api/candidates`,
  UPLOAD_RESUME: `${get_domain}/api/uploadResume`,
};

export default apiUrls;
