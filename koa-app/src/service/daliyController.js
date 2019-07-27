// 引入 mysql
import sequelizeCase from "../components/mysqlSequelize"


export async function getDailyLists() {
    const sql = "SELECT * FROM `gro-up`.`exc_daily`";
    return await sequelizeCase.query({sql: sql, queryType: "select"})
}

