module.exports = (express, app) => {
  const controller = require("../controller/follow.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Create a new post.
  router.post("/", controller.create);

  // Delete a post.
  router.delete("/delete/:follow_id", controller.delete);

  // Add routes to server.
  app.use("/api/follows", router);
};
