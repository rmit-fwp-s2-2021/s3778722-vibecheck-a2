module.exports = (express, app) => {
  const controller = require("../controller/commentLike.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Create a new post.
  router.post("/", controller.create);

  // Update a post.
  router.put("/edit", controller.update);

  // Delete a post.
  router.delete("/delete/:commentlike_id", controller.delete);

  // Add routes to server.
  app.use("/api/commentlikes", router);
};
