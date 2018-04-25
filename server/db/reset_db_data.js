const models = require('../models/models');
models.Player.destroy({where: {}});
models.Room.destroy({where: {}});
models.Score.destroy({where: {}});