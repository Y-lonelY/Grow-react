// 引入 mysql
import sequelizeCase from "C/mysqlSequelize";

/**
 * (leg/belly/chest) 数据总和
 * @param {start} params 开始时间
 * @param {end} params 结束时间
 */
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
    } catch (e) {
        console.log(e);
    }

    return dailyObj;
}

/**
 * everyday lists of (leg/belly/chest)
 * @param {start} params 开始时间
 * @param {end} params 结束时间
 */
async function getDailyLists(params) {
    let list = [];
    const sql_daily_list = `SELECT id, date, \`leg-nums\` AS leg, \`belly-nums\` AS belly, \`chest-nums\` AS chest`
                         + ` FROM \`gro-up\`.exc_daily`
                         + ` WHERE date BETWEEN '${params.start}' AND '${params.end}'`
                         + ` ORDER BY date DESC`;

    try {
        const daily_list = await sequelizeCase.query({ sql: sql_daily_list, queryType: "select"});
        list = daily_list;
    } catch (e) {
        console.log(e);
    }

    return list;
}

/**
 * add exercise list
 * 对于类型为 date 的必须以 ‘’ 包裹
 * 返回值为一个数组 - (当前所有记录数，受影响的行数)
 */
async function addExerciseList(params) {
    const sql_add_list = `INSERT INTO exc_daily ( date, \`leg-nums\`, \`belly-nums\`, \`chest-nums\` )`
                       + ` VALUES  ( '${params.date}', '${params.leg}', '${params.belly}', '${params.chest}' )`;
    
        try {
            const add_list = await sequelizeCase.query({ sql: sql_add_list, queryType: 'insert'});
            return add_list;
        } catch (e) {
            console.log(e);
        }
}



export { getDailySum, getDailyLists, addExerciseList}