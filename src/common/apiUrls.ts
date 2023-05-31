// const get_domain = "http://api-tectalent.eastus.cloudapp.azure.com";
const get_domain = process.env.REACT_APP_PORTAL_DOMAIN;

const apiUrls = {
  GET_CONFIG: `${get_domain}/api/config`,
  ADD_CANDIDATE: `${get_domain}/api/candidates`,
  GET_CANDIDATES: `${get_domain}/api/candidates`,
  UPLOAD_RESUME: `${get_domain}/api/uploadResume`,
  GET_GP_LOCATIONS: `https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&components=country:us|ca&key=${process.env.REACT_APP_GA_PLACES_API}&input=`
};

export default apiUrls;
