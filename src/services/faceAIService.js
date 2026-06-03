import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const predictFaceStroke = async (imagePath) => {

  try {

    const formData = new FormData();

    formData.append(
      "file",
      fs.createReadStream(imagePath)
    );

    const response = await axios.post(
      process.env.FACE_AI_URL,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    return response.data;

  } catch (error) {

    console.log("FACE AI ERROR:");

    console.log(
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.detail ||
      error.message
    );

  }

};