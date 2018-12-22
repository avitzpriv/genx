const Sequelize = require('sequelize');
const genDB = require('./db');

class fastq {
    constructor() {
        this.db = new genDB().getInstance();
    }

    create(ownerId, fastqUrl) {
        return this.db.getFastqModel().create({
            owner_id   : ownerId,
            fastq_url  : fastqUrl
        });
    }

    getById(ownerId) {
        return this.db.getFastqModel().findAll({where: {owner_id : ownerId}});
    }

    getAll(labId) {
        return this.db.getFastqModel().findAll();
    }
}

module.exports = Lab;