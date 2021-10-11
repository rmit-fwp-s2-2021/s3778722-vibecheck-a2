module.exports = (express, app) => {
  const controller = require("../controller/postLike.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Create a new post.
  router.post("/", controller.create);

  // Update a post.
  router.put("/edit", controller.update);

  // Delete a post.
  router.delete("/delete/:postlike_id", controller.delete);

  // Add routes to server.
  app.use("/api/postlikes", router);
};
