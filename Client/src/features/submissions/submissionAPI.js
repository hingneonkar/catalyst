import api from '../../api';

export const createSubmission = async (data) => {
  const response = await api.post('/submission', data);
  return response.data;
};

export const fetchSubmissions = async (filters) => {
  const params = filters ? { params: filters } : {};
  const response = await api.get('/submission', params);
  return response.data?.data;
};
