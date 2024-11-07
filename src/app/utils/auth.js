export const isLoggedIn = async (refreshToken) => {
  let validity = false;
  try {
    if (!refreshToken || refreshToken.length === 0) {
      validity = false;
    } else {
      const response = await (
        await fetch(process.env.EXTERNAL_API_URL + "/auth/token", {
          method: "POST",
          body: JSON.stringify({
            refresh_token: refreshToken,
          }),
          headers: { "Content-Type": "application/json" },
        })
      ).json();
        validity = true;
    }
  } catch (error) {
    console.log(error);
    validity = false;
  }

  return validity;
};
