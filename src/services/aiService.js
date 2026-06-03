import axios from "axios";

export const predictStroke = async (data) => {

  try {

    const response = await axios.post(
      process.env.AI_URL,
      data
    );

    return response.data;

  } catch (error) {

    console.log("ERROR AI SERVICE:");

    console.log(
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.detail?.[0]?.msg ||
      error.message
    );

  }

};