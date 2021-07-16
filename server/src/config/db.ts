const release = true
const configAll = {
    debug: {
        sql: {
            sqlServer: "localhost",
            sqlDatabase: "sportstest",
            sqlUser: "root",
            sqlpwd: "123456"
        }
    },
    release: {
        sql: {
            sqlServer: "127.0.0.1",
            sqlDatabase: "sportsproduction",
            sqlUser: "root",
            sqlpwd: "123456"
        }
    }
}

const config = release ? configAll.release : configAll.debug

export default config