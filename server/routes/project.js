const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Admins only");

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

module.exports = router;
