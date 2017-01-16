/*!
 * @author harrytang@vipabc.com 
 * @date 17/1/16.
 */
let Sequelize = require("sequelize");
let settings = require("../config/db.js");
let log = require("../services/log.js");

let sequelize = new Sequelize(settings.db, settings.user, settings.password, {
    host : settings.host,
    port : settings.port,
    dialect : "mysql",
    logging: function (str) {
        log.info(str+"<!log>");
    }
});

let stockCollection = sequelize.define('stockList', {
    ID: {
        type: Sequelize.INTEGER(100),
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        comment: "主键"
    },
    STOCKID: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: " ",
        comment: "股票代码"
    },
    STOCKNAME: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
        comment: "股票简称"
    },
    STOCKCHINANAME: {
        type: Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
        comment: "股票名称"
    },
    CREATEDAT: {
        type: Sequelize.DATE
    },
    UPDATEAT: {
        type: Sequelize.DATE
    }
}, {
    createdAt: 'CREATEDAT',
    updatedAt: 'UPDATEAT',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = stockCollection;