const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

module.exports = router;
