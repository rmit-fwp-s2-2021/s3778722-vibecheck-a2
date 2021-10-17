module.exports = (express, app) => {
  const controller = require("../controller/follow.js");
  const router = express.Router();

  // Select all follows
  router.get("/", controller.all);

  // Create a new follow
  router.post("/", controller.create);

  // Delete a follow
  router.delete("/delete/:follow_id", controller.delete);

  // Add routes to server.
  app.use("/api/follows", router);
};
