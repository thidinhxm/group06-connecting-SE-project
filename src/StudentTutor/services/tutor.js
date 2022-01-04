const {models} = require('../models');

exports.listTutorsInfo = () => {
    return models.tutor.findAll({
        raw: true,
    });
}

