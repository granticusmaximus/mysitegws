import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
});

export const getPosts = async () => {
  const res = await api.get('/posts?populate=*');
  return res.data.data;
};