// 引入 mysql
import sequelizeCase from "../components/mysqlSequelize"
import { mapOptionFieldNames } from "sequelize/types/lib/utils";

// sum(leg/belly/chest)
async function getDailySum(params) {
    let dailyObj = {};
    const sql = `SELECT SUM(\`leg-nums\`) AS leg, SUM(\`belly-nums\`) AS belly, SUM(\`chest-nums\`) AS chest`  
              + ` FROM \`gro-up\`.\`exc_daily\``
              + ` WHERE date BETWEEN '${params.start}' AND '${params.end}'`;

    try {
        const sumList = await sequelizeCase.query({ sql: sql, queryType: "select" });

        if (sumList.length > 0) {
            dailyObj = sumList[0];
        }

        return dailyObj;
    } catch (e) {
        console.log(e);
    }
    
}

// everyday lists of (leg/belly/chest)
async function getDailyLists(params) {
    let list = [];
    const sql_daily_list = `SELECT id, date, \`leg-nums\` AS leg, \`belly-nums\` AS belly, \`chest-nums\` AS chest`
                         + ` FROM \`gro-up\`.exc_daily`
                         + ` WHERE date BETWEEN '${params.start}' AND '${params.end}'`
                         + ` ORDER BY date DESC`;

    try {
        let daily_list = await sequelizeCase.query({ sql: sql_daily_list, queryType: "select"});
        list = daily_list;
        return list;
    } catch (e) {
        console.log(e);
    }
}

export { getDailySum, getDailyLists }