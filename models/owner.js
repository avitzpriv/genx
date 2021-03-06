const Sequelize = require('sequelize');
const genDB = require('../db');

class Owner {
    constructor() {
        this.db = new genDB().getInstance();
    }

    create(name, email, pass) {
        return this.db.getOwnerDetailsModel().create({
            user_name  : name,
            user_email : email,
            user_pass  : pass            
        });
    }

    getById(userId) {
        return this.db.getOwnerDetailsModel().findAll({where: {user_id : userId}});
    }

    getByLabId(labId) {
        return this.db.getOwnerDetailsModel().findAll({
            include: [{
                model: this.db.getLab2OwnersModel(),
                where: {lab_Id:labId}
            }]});
        // Project.findAll({
        //     include: [{
        //         model: Task,
        //         where: { state: Sequelize.col('project.state') }
        //     }]
        // })
    }
}

module.exports = Owner;