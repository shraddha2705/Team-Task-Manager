const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  const project = await Project.create({
    name: req.body.name,
    members: [req.user.id],
  });

  res.json(project);
});

router.get("/", auth, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

module.exports = router;
