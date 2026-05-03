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

router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
