module.exports = (express, app) => {
  const controller = require("../controller/user.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:email", controller.one);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // Update a profile.
  router.put("/edit", controller.update);

  // Update a profile.
  router.delete("/delete", controller.delete);

  // Add routes to server.
  app.use("/api/users", router);
};
