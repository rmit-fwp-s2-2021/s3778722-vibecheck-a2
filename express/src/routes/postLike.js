module.exports = (express, app) => {
  const controller = require("../controller/postLike.js");
  const router = express.Router();

  // Select all post likes
  router.get("/", controller.all);

  // Create a new post like
  router.post("/", controller.create);

  // Update a post like
  router.put("/edit", controller.update);

  // Delete a post like
  router.delete("/delete/:postlike_id", controller.delete);

  // Add routes to server.
  app.use("/api/postlikes", router);
};
