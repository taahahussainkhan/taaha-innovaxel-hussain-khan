import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const shortenUrl = async (url) => {
  return axios.post(`${BASE_URL}/shorten`, { url });
};

export const getOriginalUrl = async (shortCode) => {
  return axios.get(`${BASE_URL}/shorten/${shortCode}`);
};

export const deleteShortUrl = async (shortCode) => {
  return axios.delete(`http://localhost:3000/shorten/${shortCode}`);
};


export const getStats = async (shortCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/shorten/stats/${shortCode}`);
    return response;
  } catch (error) {
    throw error;
  }
};


export const updateShortUrl = (shortCode, newUrl) => {
  return axios.put(`${BASE_URL}/shorten/${shortCode}`, { url: newUrl });
};