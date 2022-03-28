const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// Route to get all exercises in database

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: ", err));
});

// Route to add new exercise to database

router.route("/add").post((req, res) => {
  // Declare variables for every item in the body //
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  // create new class object from declared variables
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  // saves newly created object to database and log succes/failure
  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: ", err));
});

// Route to retrieve specific exercise from database

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error :" + err));
});

// Route to retrieve specific exercise and delete

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then((results) => res.json("Exercise deleted. " + results))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route to retrieve specific exercise and update

router.route("/update/:id").post((req, res) => {
  // Find exercise in exercise database using id from url params
  Exercise.findById(req.params.id)
    .then((exercise) => {
      //   reassign each value in the database
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      //   saves newly created objec tto database and log succes/failure
      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
