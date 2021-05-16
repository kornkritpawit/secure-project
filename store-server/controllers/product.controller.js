const Service = require('../services/product.service');
const { ErrorUnauthorized } = require('../configs/errorMethods');

const methods = {
  async onGetAll(req, res) {
    console.log(req.user);
    try {
      const result = await Service.find(req);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },

  async onGetById(req, res) {
    try {
      const result = await Service.findById(req.params.id);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },

  async onInsert(req, res) {
    if (req.user.role === 'admin') {
      try {
        const result = await Service.insert(req.body);
        res.success(result, 201);
      } catch (error) {
        res.error(error);
      }
    } else {
      res.error(ErrorUnauthorized('You are unauthorized in this method'));
    }
  },

  async onUpdate(req, res) {
    if (req.user.role === 'admin') {
      try {
        const result = await Service.update(req.params.id, req.body);
        res.success(result);
      } catch (error) {
        res.error(error);
      }
    } else {
      res.error(ErrorUnauthorized('You are unauthorized in this method'));
    }
  },

  async onDelete(req, res) {
    if (req.user.role === 'admin') {
      try {
        await Service.delete(req.params.id);
        res.success('success', 204);
      } catch (error) {
        res.error(error);
      }
    } else {
      res.error(ErrorUnauthorized('You are unauthorized in this method'));
    }
  },

  async onLogin(req, res) {
    try {
      const result = await Service.login(req.body);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },

  onRegister(req, res) {
    res.success({ page: 'login' });
  },
};

module.exports = { ...methods };
