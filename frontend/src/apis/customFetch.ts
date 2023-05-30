export const callApi = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const response = await fetch(input, init);

  if (!response.ok) {
    const errorBody = await response.json();
    const errorMessage: string = errorBody.error || 'Error calling API';
    throw Error(errorMessage);
  }

  return response;
};
