export const up = (pgm) => {

  pgm.createTable("detections", {

    id: "id",

    user_id: {
      type: "integer",
      references: "users(id)",
      onDelete: "cascade",
    },

    image_url: {
      type: "text",
      notNull: true,
    },

    // =========================
    // DATA INPUT RANDOMFOREST
    // =========================
    gender: {
      type: "varchar(20)",
    },

    age: {
      type: "float",
    },

    hypertension: {
      type: "integer",
    },

    heart_disease: {
      type: "integer",
    },

    ever_married: {
      type: "varchar(20)",
    },

    work_type: {
      type: "varchar(50)",
    },

    residence_type: {
      type: "varchar(20)",
    },

    avg_glucose_level: {
      type: "float",
    },

    bmi: {
      type: "float",
    },

    smoking_status: {
      type: "varchar(50)",
    },

    // =========================
    // HASIL RANDOMFOREST
    // =========================
    rf_result: {
      type: "varchar(50)",
    },

    // =========================
    // HASIL FACE DETECTION
    // =========================
    face_result: {
      type: "varchar(50)",
    },

    face_confidence: {
      type: "float",
    },

    created_at: {
      type: "timestamp",
      default: pgm.func("now()"),
    },

  });

};

export const down = (pgm) => {

  pgm.dropTable("detections");

};