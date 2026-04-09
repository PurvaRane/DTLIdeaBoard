import axios from 'axios';

const API_URL = 'http://localhost:5001/api/ideas';

export const getIdeas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createIdea = async (idea) => {
  const response = await axios.post(API_URL, idea);
  return response.data;
};

export const updateIdea = async (id, updatedIdea) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedIdea);
  return response.data;
};

export const deleteIdea = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
