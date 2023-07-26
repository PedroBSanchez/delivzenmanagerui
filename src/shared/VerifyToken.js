import axios from "axios";

const verifyToken = async () => {
  const token = localStorage.getItem("tokenApi");
  let isValidToken = false;

  if (!token) {
    return isValidToken;
  }

  const options = {
    url: `${import.meta.env.VITE_API_URL}/api/users/validatetoken`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    },
  };

  await axios
    .request(options)
    .then((response) => {
      isValidToken = true;
    })
    .catch((error) => {
      isValidToken = false;
    });

  return isValidToken;
};

export { verifyToken };
