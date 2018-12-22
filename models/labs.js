const Sequelize = require('sequelize');
const genDB = require('../db');

class Lab {
    constructor() {
        this.db = new genDB().getInstance();
    }

    create(labName, labUserName, labUserEmail, labUserPass) {
        return this.db.getLabsModel().create({
            lab_name       : labName,
            lab_user_name  : labUserName,
            lab_user_email : labUserEmail,
            lab_user_pass  : labUserPass
        });
    }

    getById(labId) {
        return this.db.getLabsModel().findAll({where: {lab_id : labId}});
    }

    getAll() {
        return this.db.getLabsModel().findAll();
    }

    addOwner2Lab(ownerId, labId) {
        return this.db.getLab2OwnersModel().create({
            owner_id : ownerId,
            lab_id   : labId
        })
    }
}

module.exports = Lab;