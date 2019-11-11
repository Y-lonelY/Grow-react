// 引入 mysql
import sequelizeCase from 'C/mysqlSequelize';
import { getGoalList, updateGoalRecord } from './exerciseGoalController';
import monent from 'moment';
import moment from 'moment';

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

    const sumList = await sequelizeCase.query({ sql: sql, queryType: "select" });

    if (sumList.length > 0) {
        dailyObj = sumList[0];
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

    list = await sequelizeCase.query({ sql: sql_daily_list, queryType: "select" });
    return list;
}

/**
 * add exercise list
 * 对于类型为 date 的必须以 ‘’ 包裹
 * 返回值为一个数组 - [当前所有记录数，受影响的行数]
 */
async function addExerciseList(params) {
    const sql_add_list = `INSERT INTO exc_daily ( date, \`leg-nums\`, \`belly-nums\`, \`chest-nums\` )`
        + ` VALUES  ( '${params.date}', '${params.leg}', '${params.belly}', '${params.chest}' )`;
    const res = await sequelizeCase.query({ sql: sql_add_list, queryType: 'insert' });
    // 插入成功，更新 goal table
    if (Array.isArray(res) && res.length > 0) {
        // 获取当前正在进行的goal
        let goal_res = (await getGoalList({status: 1}))[0];
        const goal = Number(goal_res.goal);
        const summary = Number(goal_res.summary);
        const sum = Number(params.leg) + Number(params.belly) + Number(params.chest);
        // 小于 goal，则仅需要更新当前进行的 goal
        if (sum + summary < goal) {
            goal_res['summary'] = sum + summary;
            await updateGoalRecord(goal_res);
        } else {
            const new_summary = sum + summary - goal;
            goal_res['summary'] = goal;
            goal_res['end_date'] = moment().format('YYYY-MM-DD HH:mm:ss');
            goal_res['status'] = 2;
            // 更新正在进行的
            await updateGoalRecord(goal_res);
            // 获取一个新的未进行列，将其设置为新的进行列
            let new_goal_res = await getGoalList({status: 0})[0];
            new_goal_res['start_date'] = moment().format('YYYY-MM-DD HH:mm:ss');
            new_goal_res['summary'] = new_summary;
            new_goal_res['status'] = 1;
            await updateGoalRecord(new_goal_res);
        }
    }
    return res;
}



export { getDailySum, getDailyLists, addExerciseList }