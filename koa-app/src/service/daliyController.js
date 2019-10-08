// 引入 mysql
import sequelizeCase from "../components/mysqlSequelize"

// sum(leg/belly/chest)
async function getDailySum() {
    const sql = "SELECT SUM(`leg-nums`) AS leg, SUM(`belly-nums`) AS belly, SUM(`chest-nums`) AS chest " 
              + "FROM `gro-up`.`exc_daily`";
    const sumList = await sequelizeCase.query({
        sql: sql,
        queryType: "select"
    });

    if (sumList.length > 0) {
        return sumList[0];
    } else {
        return {};
    }
}

// everyday lists of (leg/belly/chest)
async function getDailyLists(params) {
    let list = [];
    const sql_daily_list = `SELECT id, date, \`leg-nums\` AS leg, \`belly-nums\` AS belly, \`chest-nums\` AS chest`
                         + ` FROM \`gro-up\`.exc_daily`
                         + ` WHERE date BETWEEN '${params.start}' AND '${params.end}'`
                         + ` ORDER BY date DESC`;
    let daily_list = await sequelizeCase.query({ sql: sql_daily_list, queryType: "select"});

    list = daily_list;
    return list;
}

export { getDailySum, getDailyLists }