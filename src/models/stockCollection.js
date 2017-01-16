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

let stockCollection = sequelize.define('stockCollection', {
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
    OPENATCASH: {
        type: Sequelize.FLOAT(11),
        allowNull: false,
        defaultValue: 0,
        comment: "开盘价格"
    },
    MIDCLOSEATCASH: {
        type: Sequelize.FLOAT(11),
        allowNull: false,
        defaultValue: 0,
        comment: "中午休盘价格"
    },
    MIDOPENATCASH: {
        type: Sequelize.FLOAT(11),
        allowNull: false,
        defaultValue: 0,
        comment: "中午开盘价格"
    },
    CLOSEATCASH: {
        type: Sequelize.FLOAT(20),
        allowNull: false,
        defaultValue: 0,
        comment: "当天休盘价格"
    },
    TRADECOUNT: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        comment: "成交量"
    },
    DATE: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: "2017-01-16",
        comment: "日期"
    },
    UPDATEAT: {
        type: Sequelize.DATE
    }
}, {
    updatedAt: 'UPDATEAT',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = stockCollection;