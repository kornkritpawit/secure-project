const Service = require('../services/user.service');

const methods = {
  async onGetAll(req, res) {
    if (req.user.role === 'admin') {

    try {
      let result = await Service.find(req);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  } else {
    res.error(ErrorUnauthorized('You are unauthorized in this method'));
  }
  },

  async onGetById(req, res) {
    if (req.user.role === 'admin') {
      try {
        let result = await Service.findById(req.params.id);
        res.success(result);
      } catch (error) {
        res.error(error);
      }
    } else {
      res.error(ErrorUnauthorized('You are unauthorized in this method'));
    }
  },

  async onInsert(req, res) {
    try {
      let result = await Service.insert(req.body);
      res.success(result, 201);
    } catch (error) {
      res.error(error);
    }
  },

  async onUpdate(req, res) {
    try {
      if (req.params.id === req.user.id) {
        const result = await Service.update(req.params.id, req.body);
        res.success(result);
      } else {
        res.error(ErrorUnauthorized('You are not allowed to update other user'));
      }
    } catch (error) {
      res.error(error);
    }
  },

  async me(req, res) {
    console.log(req)
    try {
      const result = await Service.me(req.user)
      res.success(result)
    } catch (error) {
      res.error(error)
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
      let result = await Service.login(req.body);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },

  async onRegister(req, res) {
    try {
      let result = await Service.insert(req.body);
      res.success(result, 201);
    } catch (error) {
      res.error(error);
    }
  },

  async onRefreshToken(req, res) {
    try {
      let result = await Service.refreshToken(req.body.accessToken);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },
};

module.exports = { ...methods };
