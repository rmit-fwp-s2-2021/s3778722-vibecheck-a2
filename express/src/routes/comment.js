module.exports = (express, app) => {
  const controller = require("../controller/comment.js");
  const router = express.Router();

  // Select all comments.
  router.get("/", controller.all);

  // Create a new comment.
  router.post("/", controller.create);

  // Update a comment.
  router.put("/edit", controller.update);

  // Delete a comment.
  router.delete("/delete/:comment_id", controller.delete);

  // Add routes to server.
  app.use("/api/comments", router);
};
