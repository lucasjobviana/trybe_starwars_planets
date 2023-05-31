export const fetchAPI = async () => {
  const jsonResponse = await fetch('https://swapi.dev/api/planets');
  return jsonResponse.json();
};
