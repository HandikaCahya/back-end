import { body } from "express-validator";

export const detectionValidation = [

  body("gender")
    .notEmpty()
    .withMessage("Gender is required"),

  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isFloat({ min: 1, max: 120 })
    .withMessage("Invalid age"),

  body("hypertension")
    .notEmpty()
    .withMessage("Hypertension is required")
    .isIn([0, 1, "0", "1"])
    .withMessage("Hypertension must be 0 or 1"),

  body("heart_disease")
    .notEmpty()
    .withMessage("Heart disease is required")
    .isIn([0, 1, "0", "1"])
    .withMessage("Heart disease must be 0 or 1"),

  body("ever_married")
    .notEmpty()
    .withMessage("Ever married is required"),

  body("work_type")
    .notEmpty()
    .withMessage("Work type is required"),

  body("residence_type")
    .notEmpty()
    .withMessage("Residence type is required"),

  body("avg_glucose_level")
    .notEmpty()
    .withMessage("Average glucose level is required")
    .isFloat({ min: 1 })
    .withMessage("Invalid glucose level"),

  body("bmi")
    .notEmpty()
    .withMessage("BMI is required")
    .isFloat({ min: 1 })
    .withMessage("Invalid BMI"),

  body("smoking_status")
    .notEmpty()
    .withMessage("Smoking status is required")

];