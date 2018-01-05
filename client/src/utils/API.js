import axios from "axios";
import config from "../config"

export default {
  getProfile: () => {
    console.log('Requesting user profile...')
    return axios.get(config.url + "api/profile")
  },

  register: (formData) => {
    console.log('Sending registration')
    return axios.post(config.url + "auth/register", formData)
  }

};
