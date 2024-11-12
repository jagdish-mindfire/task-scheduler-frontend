import { endpoints } from '../constants/endpoints';

export const isLoggedIn = async (refreshToken) => {
  let validity = false;
  try {
    if (!refreshToken || refreshToken.length === 0) {
      validity = false;
    } else {
      const response = await fetch(
        process.env.EXTERNAL_API_URL + endpoints.TOKEN,
        {
          method: 'POST',
          body: JSON.stringify({
            refresh_token: refreshToken,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        validity = true;
      } else {
        validity = false;
      }
    }
  } catch (error) {
    console.log(error);
    validity = false;
  }

  return validity;
};
