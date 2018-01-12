import axios from "axios";

export default {
  getProfile: () => {
    console.log('Requesting user profile...')
    return axios.get("api/profile")
  },

  register: (formData) => {
    console.log('Sending registration')
    return axios.post("auth/register", formData)
  },

  postScore: (score) => {
    return axios.post("api/profile/score", score)
  }

};
