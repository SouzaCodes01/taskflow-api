const taskService = require('../services/task.service');

class TaskController {
  async list(req, res, next) {
    try {
      const result = await taskService.list(req.user.id, req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const task = await taskService.getById(req.params.id, req.user.id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const task = await taskService.create(req.user.id, req.body);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const task = await taskService.update(req.params.id, req.user.id, req.body);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const task = await taskService.updateStatus(req.params.id, req.user.id, req.body.status);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await taskService.delete(req.params.id, req.user.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();