import * as jmEzMySql from "jm-ez-mysql";
import { Constants } from "./config/constants";
export class DB {
    public static init() {
        jmEzMySql.init({
            database: process.env.DATABASE,
            dateStrings: true,
            host: process.env.DBHOST,
            multipleStatements: true,
            password: process.env.DBPASSWORD,
            timeout: 100 * 60 * 1000,
            timezone: "utc",
            debug: true,
            user: process.env.DBUSER,
            charset: Constants.DB_DEFAULTS.CHARSET,
            collation: Constants.DB_DEFAULTS.COLLATION
        });
    }
}
