const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Add user routes.
require("./src/routes/user.js")(express, app);
require("./src/routes/post.js")(express, app);
require("./src/routes/comment.js")(express, app);
require("./src/routes/postLike.js")(express, app);
require("./src/routes/commentLike.js")(express, app);
require("./src/routes/follow.js")(express, app);

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
