import pool from "../config/db.js";
import { predictStroke } from "../services/aiService.js";
import { predictFaceStroke } from "../services/faceAIService.js";

export const detectStroke = async (req, res) => {

  try {

    // VALIDASI IMAGE
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required"
      });
    }

    console.log("========== REQUEST DETECTION ==========");

    console.log("BODY:");
    console.log(req.body);

    console.log("FILE:");
    console.log(req.file);

    console.log("USER:");
    console.log(req.user);

    const imagePath = req.file.path;
    const user_id = req.user.id;

    // =========================
    // DATA UNTUK RANDOMFOREST AI
    // =========================
    const dataAI = {
      gender: req.body.gender,
      age: Number(req.body.age || 0),
      hypertension: Number(req.body.hypertension || 0),
      heart_disease: Number(req.body.heart_disease || 0),
      ever_married: req.body.ever_married,
      work_type: req.body.work_type,
      residence_type: req.body.residence_type,
      avg_glucose_level: Number(req.body.avg_glucose_level || 0),
      bmi: Number(req.body.bmi || 0),
      smoking_status: req.body.smoking_status
    };

    console.log("DATA DARI POSTMAN:", req.body);

    // RANDOMFOREST AI
    const aiResult = await predictStroke(dataAI);

    const rf_result = aiResult.hasil_prediksi;

    // FACE DETECTION AI
    const faceResult = await predictFaceStroke(imagePath);

    const face_prediction = faceResult.prediction;

    const confidence_stroke =
      faceResult.confidence_stroke;

    // SIMPAN KE DATABASE
    await pool.query(
      `
      INSERT INTO detections (
        user_id,
        image_url,

        gender,
        age,
        hypertension,
        heart_disease,
        ever_married,
        work_type,
        residence_type,
        avg_glucose_level,
        bmi,
        smoking_status,

        rf_result,
        face_result,
        face_confidence
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
      )
      `,
      [
        user_id,
        imagePath,

        dataAI.gender,
        dataAI.age,
        dataAI.hypertension,
        dataAI.heart_disease,
        dataAI.ever_married,
        dataAI.work_type,
        dataAI.residence_type,
        dataAI.avg_glucose_level,
        dataAI.bmi,
        dataAI.smoking_status,

        rf_result,
        face_prediction,
        confidence_stroke
      ]
    );

    // =========================
    // RESPONSE
    // =========================
    res.status(201).json({

      message: "Detection completed successfully",

      data: {

        user_id,

        imagePath,

        input_data: dataAI,

        randomforest_result: rf_result,

        face_detection_result: {
          prediction: face_prediction,
          confidence_stroke: confidence_stroke,
          confidence_healthy:
            faceResult.confidence_healthy,
          message: faceResult.message
        }
      }
    });

  } catch (error) {
  console.log("========== REQUEST DETECTION ==========");
  console.log("BODY:");
  console.log(req.body);

  console.log("FILE:");
    console.log(req.file);

  console.log("USER:");
  console.log(req.user);
  }
};

// GET HISTORY
export const getHistory = async (req, res) => {

  const user_id = req.user.id;

  try {

    const result = await pool.query(
      `
      SELECT *
      FROM detections
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [user_id]
    );

    res.json(result.rows);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};