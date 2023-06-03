import { prod_domain, local_domain } from "./settings";


let get_domain = process.env.NODE_ENV === "production" ? prod_domain : local_domain
const apiUrls = {
  GET_CONFIG: `${get_domain}/api/config`,
  ADD_CANDIDATE: `${get_domain}/api/candidates`,
  GET_CANDIDATES: `${get_domain}/api/candidates`,
  UPLOAD_RESUME: `${get_domain}/api/uploadResume`,
};

export default apiUrls;
