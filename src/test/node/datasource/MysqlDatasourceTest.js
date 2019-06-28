const sinon = require("sinon");
const expect = require("chai").expect;

const SqlErrorBuilder = require("leap-data").SqlErrorBuilder;
const MysqlDatasource = require("../../../main/node/datasource/MySqlDatasource");

describe("MysqlDatasource", () => {

    it("should execute success query", async () => {

        const connection = {};
        const sql = "SELECT * FROM test";
        const values = [];
        const rowMapper = {};

        const connectionPool = {
            getConnection(callback) {
                callback(null, connection);
            }
        };

        const mysqlQuery = {
            query(connection, sql, values){}
        };

        const expectedResult = [{test: "test"}];

        const expectedPromise = new Promise((resolve => resolve(expectedResult)));

        const mockedMysqlQuery = sinon.mock(mysqlQuery);
        mockedMysqlQuery.expects("query").withExactArgs(connection, sql, values, rowMapper).returns(expectedPromise);

        const mysqlDatasource = new MysqlDatasource(connectionPool, mysqlQuery);

        const result = await mysqlDatasource.query(sql, values, rowMapper);

        expect(result).to.deep.equal(expectedResult);

    });

    it("should return error from query execution", async () => {

        const connection = {};
        const sql = "SELECT * FROM test";
        const values = [];
        const rowMapper = {};

        const connectionPool = {
            getConnection(callback) {
                callback(null, connection);
            }
        };

        const mysqlQuery = {
            query(connection, sql, values){}
        };

        const expectedException = "Table test not found";

        const expectedPromise = new Promise(((resolve, reject) => reject(expectedException)));

        const mockedMysqlQuery = sinon.mock(mysqlQuery);
        mockedMysqlQuery.expects("query").withExactArgs(connection, sql, values, rowMapper).returns(expectedPromise);

        const mysqlDatasource = new MysqlDatasource(connectionPool, mysqlQuery);

        try {
            await mysqlDatasource.query(sql, values, rowMapper);
        } catch (e) {
            expect(e).to.deep.equal(expectedException);
        }

    });

    it("should return error database connection", async () => {

        const error = "Error to open conneciton";
        const sql = "SELECT * FROM table";
        const values = [];
        const rowMapper = {};

        const expectedException = SqlErrorBuilder.build("DATABASE_CONNECTION", "Error during open connection", error);

        const connectionPool = {
            getConnection(callback) {
                callback(error);
            }
        };

        const mysqlDatasource = new MysqlDatasource(connectionPool);

        try {
            await mysqlDatasource.query(sql, values, rowMapper);
        } catch (e) {
            expect(e).to.deep.equal(expectedException);
        }
    });
});