const sinon = require("sinon");
const expect = require("chai").expect;

const mockedMysql = sinon.mock(require("mysql"));
const MysqlDatasourceFactory = require("../../../main/node/factory/MysqlDatasourceFactory");

describe("MysqlDatasourceFactory", () => {

    it("should create MysqlDatasource", () => {
        
        const host = "host";
        const user = "user";
        const pass = "pass";
        const connectionLimit = 1;
        const database = "database";

        const configuration = { host: host, user: user, pass: pass, database: database, connectionLimit: connectionLimit };
        const connectionPool = {};

        mockedMysql.expects("createPool").withExactArgs(configuration).returns(connectionPool);

        const mysqlDatasourceFactory = new MysqlDatasourceFactory(host, user, pass, database, connectionLimit);

        const mysqlDatasource = mysqlDatasourceFactory.create();

        expect(mysqlDatasource).to.not.be.null;
    });
});