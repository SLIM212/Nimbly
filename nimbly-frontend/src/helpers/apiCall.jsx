export default async function apiCall({ url, method, body }) {
  const defaultUrl = import.meta.env.VITE_API_URL;
  console.log('API URL:', defaultUrl + url);
  const token = localStorage.getItem('user-token');
  
  const options = {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : undefined,
    },
  }
  
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }
  console.log(options)
  try {
    const response = await fetch(defaultUrl + url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Something went wrong');
    }

    return result;
  } catch (error) {
    throw new Error(error.message || 'Unknown error occurred');
  }
}
