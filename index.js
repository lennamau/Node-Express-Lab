// import your node modules
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.use(express.json());

// add your server code starting here

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:user", (req, res) => {
  const id = req.params.user;

  db.findById(id)
    .then(posts => {
      if (posts.length) {
        res.status(200).json({ posts });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});



server.listen(4000, () => {
  console.log("\n*** Running on port 4000 ***\n");
});
