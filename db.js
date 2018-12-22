const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const settings = require('./settings');

class genDB {

    constructor() {
        this.connection = new Sequelize('geneyx', 
                                        settings.dbConfig.user, 
                                        settings.dbConfig.password, 
            {
            // the sql dialect of the database
            // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
            dialect: 'postgres',
        
            // custom host; default: localhost
            host: settings.dbConfig.host,
        
            // custom port; default: dialect default
            port: settings.dbConfig.port,
        
            // disable logging; default: console.log
            logging: false,
        
            // Specify options, which are used when sequelize.define is called.
            // The following example:
            //   define: { timestamps: false }
            // is basically the same as:
            //   sequelize.define(name, attributes, { timestamps: false })
            // so defining the timestamps for each model will be not necessary
        
            // similar for sync: you can define this to always force sync for models
            sync: { force: true },

            operatorsAliases: false,
        
            // pool configuration used to pool database connections
            pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
            },
        })
    }

    getOwnerDetailsModel() {
        return this.owner_details;
    }

    getOwnerInfoModel() {
        return this.owner_info;
    }

    getLabsModel() {
        return this.labs;
    }

    getLab2OwnersModel() {
        return this.lab2owners;
    }

    initDB() {
        //define owner details table
        this.owner_details = this.connection.define('owner_details', {
            user_id    : {type: Sequelize.INTEGER, primaryKey:true, autoIncrement: true},
            user_name  : {type: Sequelize.STRING, allowNull:false}, //encrypted
            user_email : {type: Sequelize.STRING, unique: true, validate: {isEmail:true}},
            user_pass  : {type: Sequelize.STRING, allowNull:false},            
            active     : {type: Sequelize.BOOLEAN, defaultValue: true},
            deleted    : {type: Sequelize.BOOLEAN, defaultValue:false},
            user_type  : {type: Sequelize.INTEGER},
            birth_date : {type: Sequelize.DATE},
            gender     : {type: Sequelize.BOOLEAN},
            user_blood_type: {type: Sequelize.INTEGER},
            user_property1 : {type: Sequelize.STRING},
            user_property2 : {type: Sequelize.STRING}
        },{freezeTableName : true})

        this.owner_details.addHook('beforeValidate', (od, opt) => {
            od.user_pass = bcrypt.hashSync(od.user_pass,8);
        });

        //define owners info table
        this.owner_info = this.connection.define('owner_info', {
            user_id    : {type: Sequelize.STRING, primaryKey:true}, //encrypted
            user_name  : {type: Sequelize.STRING, allowNull:false}
        },{freezeTableName : true})

        // define labs table
        this.labs = this.connection.define('labs', {
            lab_id      : {type: Sequelize.INTEGER, primaryKey:true, autoIncrement: true},
            lab_name    : {type: Sequelize.STRING, allowNull:false},
            lab_address : {type: Sequelize.STRING},
            lab_user_name : {type: Sequelize.STRING},
            lab_user_email: {type: Sequelize.STRING, unique: true, validate: {isEmail:true}},
            lab_user_pass : {type: Sequelize.STRING}, // encrypted
            active        : {type: Sequelize.BOOLEAN, defaultValue: true},
            deleted       : {type: Sequelize.BOOLEAN, defaultValue: false},
            lab_type      : {type: Sequelize.INTEGER},
            lab_property1 : {type: Sequelize.STRING},
            lab_property2 : {type: Sequelize.STRING}
        },{freezeTableName : true});

        this.labs.addHook('beforeValidate', (lab, opt) => {
            lab.lab_user_pass = bcrypt.hashSync(lab.lab_user_pass,8);
        });

        // define lab to owner table
        this.lab2owners = this.connection.define('lab2owners', {
            lab_id  : {type: Sequelize.INTEGER},
            user_id : {type: Sequelize.INTEGER}
        })

        // define fastq table
        this.fastqs = this.connection.define('fastqs', {
            fastq_id  : {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
            owner_id  : {type:Sequelize.INTEGER},
            fastq_url : {type:Sequelize.STRING, validate:{isUrl:true}}
        })

        return this.connection.sync();
    }

    closeDB() {
        return this.connection.close();
    }
}

class db {
    constructor() {
        if(!db.instance) {
            db.instance = new genDB();
        }
    }

    getInstance() {
        return db.instance;
    }
}

module.exports = db;