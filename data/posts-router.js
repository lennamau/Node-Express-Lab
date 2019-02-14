const express = require("express");
const db = require("./db.js");

const router = express.Router();

router.use(express.json())

// add your server code starting here

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
  const id = req.params.id;

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

router.post("/", (req, res) => {
  const addNew = req.body;
  if (!addNew.title || !addNew.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  db.insert(addNew)
    .then(result => {
      db.findById(result.id)
        .then(post => res.status(201).json(post))
        .catch(err =>
          res.status(500).json({
            message: "There was an error while saving the post to the database"
          })
        );
    })
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      })
    );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.findById(id)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      if (!changes.title || !changes.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      }
      db.update(id, changes).then(addNew => {
        res.status(200).json(addNew);
      });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be modified." })
    );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post.length) {
        db.remove(id).then(res.status(200).json(post));
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

module.exports = router;
