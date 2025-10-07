const Project = require('../models/Project');
const { createProject } = require('../validators/projectValidator');

exports.getProjects = async (req, res, next) => {
  try {
    const teamId = req.query.teamId || (req.user && req.user.teamId);
    if (!teamId) return res.status(400).json({ error: 'teamId required' });
    const projects = await Project.find({ teamId });
    res.json(projects);
  } catch (err) { next(err); }
};

exports.createProject = async (req, res, next) => {
  try {
    await createProject.validateAsync(req.body);
    const proj = await Project.create(req.body);
    res.status(201).json(proj);
  } catch (err) { next(err); }
};

exports.updateProject = async (req, res, next) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const removed = await Project.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
