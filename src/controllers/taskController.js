const Task = require('../models/Task');
const { createTask, updateTask } = require('../validators/taskValidator');

exports.getTasks = async (req, res, next) => {
  try {
    const projectId = req.query.projectId;
    if (!projectId) return res.status(400).json({ error: 'projectId required' });
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (err) { next(err); }
};

exports.createTask = async (req, res, next) => {
  try {
    await createTask.validateAsync(req.body);
    const t = await Task.create(req.body);
    res.status(201).json(t);
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    await updateTask.validateAsync(req.body);
    const t = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!t) return res.status(404).json({ error: 'Not found' });
    res.json(t);
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const removed = await Task.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
