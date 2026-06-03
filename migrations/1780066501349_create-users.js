export const up = (pgm) => {
  pgm.createTable("users", {
    id: "id",

    name: {
      type: "varchar(100)",
      notNull: true
    },

    email: {
      type: "varchar(100)",
      notNull: true,
      unique: true
    },

    password: {
      type: "text",
      notNull: true
    },

    created_at: {
      type: "timestamp",
      default: pgm.func("now()")
    }
  });
};

export const down = (pgm) => {
  pgm.dropTable("users");
};