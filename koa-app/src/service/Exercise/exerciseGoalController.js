import sequelizeCase from "M/mysqlSequelize";
import moment from 'moment';
/**
 * 获取 goal 列表
 * params {status} 记录状态 如果为3，则表示获取所有正在进行和已完成的记录
 */
async function getGoalList(params = { status: 3 }) {
    let list = [];
    let status_sql = '';
    switch (params.status) {
        case 0:
            status_sql = 'status = 0';
            break;
        case 1:
            status_sql = 'status = 1';
            break;
        case 3:
            status_sql = 'status > 0';
            break;
        default:
            break;
    }

    const sql = 'SELECT * FROM exc_goal WHERE ' + status_sql + ' ORDER BY start_date DESC LIMIT 6';
    const res = await sequelizeCase.query({
        sql: sql,
        type: "select"
    });
    list = res.map(item => {
        // 处理 DATETIME 类型数据
        if (item.start_date && item.start_date !== '') {
            item.start_date = moment.utc(item.start_date).format('YYYY-MM-DD HH:mm:ss');
        }
        if (item.end_date && item.end_date !== '') {
            item.end_date = moment.utc(item.end_date).format('YYYY-MM-DD HH:mm:ss');
        }
        // filter 无意义字段
        delete item.last_update;
        return item;
    });
    return list;
}

/**
 * 更新 goal 记录
 */
async function updateGoalRecord(params) {
    const sql = `UPDATE \`gro-up\`.\`exc_goal\` 
    SET \`start_date\` = '${params.start_date}', 
    \`end_date\` = ${params.end_date === null ? null : `'${params.end_date}'`}, 
    \`reward\` = '${params.reward}', 
    \`type\` = '${params.type}', 
    \`total_price\` = '${params.total_price}', 
    \`goal\` = '${params.goal}', 
    \`summary\` = '${params.summary}', 
    \`remark\` = ${params.remark === null ? null : `'${params.remark}'`}, 
    \`status\` = ${params.status} 
    WHERE \`id\` = ${params.id};`;
    const res = await sequelizeCase.query({ sql: sql, type: 'update'});
    return res;
}


export { getGoalList, updateGoalRecord }