
import config from "../config/db";
import { Connection, createConnection } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

let shareConnection: Connection = null


/**
 * 数据库管理类
 */
export default class DBManager {
    static async share(): Promise<Connection> {
        if (!shareConnection) {
            let options: MysqlConnectionOptions = {
                type: "mysql",
                host: config.sql.sqlServer,
                port: 3306,
                username: config.sql.sqlUser,
                password: config.sql.sqlpwd,
                database: config.sql.sqlDatabase,
                entities: [
                    __dirname + '/../entity/**/*.ts',
                    __dirname + '/../entity/*.js'

                ],
                synchronize: true,
                charset:"utf8mb4"
            }
            let connection = await createConnection(options)
            shareConnection = connection
            if (connection) {
                console.log("数据库连接成功---");
            }
        }

        return shareConnection
    }
}