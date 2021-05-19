const Service = require('../services/user.service');

const methods = {
  async onGetAll(req, res) {
    console.log(req.user)
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

  getCsrf(req, res) {
    res.success({ csrfToken: req.csrfToken()})
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
    console.log(req.body)
    
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
    // console.log(req)
    try {
      const result = await Service.me(req.user)
      res.success(result)
    } catch (error) {
      res.error(error)
    }
  },

  logout(req, res) {
    console.log(req.cookies)
    if (req.cookies) {
      res.clearCookie('_csrf')
      res.clearCookie('JSESSIONID')
      res.clearCookie('accessToken')
      res.success("logout successfully")
    } else {
      res.success('You have already logout')
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
    // console.log(req.csrfToken())
    try {
      let result = await Service.login(req.body);
      console.log(result)
      // res.cookie('user', result, {httpOnly: true});
      res.cookie('accessToken', result.accessToken, {httpOnly: true});
      res.success(result.userData);
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
