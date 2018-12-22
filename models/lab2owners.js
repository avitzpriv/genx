const Sequelize = require('sequelize');
const genDB = require('../db');

class Lab2Owners {
    constructor() {
        this.db = new genDB().getInstance();
    }

    create(labId, userId) {
        return this.db.getLab2OwnersModel().create({
            lab_id    : labId,
            owner_id  : ownerId
        });
    }

    getById(labId) {
        return this.db.getLab2OwnersModel().findAll();
    }

}

module.exports = Lab2Owners;