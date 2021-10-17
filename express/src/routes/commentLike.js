module.exports = (express, app) => {
  const controller = require("../controller/commentLike.js");
  const router = express.Router();

  // Select all comment like.
  router.get("/", controller.all);

  // Create a new comment like
  router.post("/", controller.create);

  // Update a comment like.
  router.put("/edit", controller.update);

  // Delete a comment like
  router.delete("/delete/:commentlike_id", controller.delete);

  // Add routes to server.
  app.use("/api/commentlikes", router);
};
