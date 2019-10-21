import sequelizeCase from "../components/mysqlSequelize";
import moment from 'moment';
/**
 * 获取 goal 列表
 */
async function getGoalList() {
    let list = [];
    const sql_goal_list = "SELECT id, start_date, end_date, reward, type, total_price, goal, summary, remark"
                        + " FROM exc_goal WHERE `status` > 0 ORDER BY start_date DESC";
    try {
        const goal_list = await sequelizeCase.query({
            sql: sql_goal_list,
            queryType: "select"
        });
        list = goal_list.map(item => {
            // 处理 DATETIME 类型数据
            if (item.start_date !== null) {
                item.start_date = moment.utc(item.start_date).format('YYYY-MM-DD HH:mm:ss');
            }
            if (item.end_date !== null) {
                item.end_date = moment.utc(item.end_date).format('YYYY-MM-DD HH:mm:ss');
            }
            return item;
        });
    } catch (e) {
        console.log(e);
    }
    return list;
}

export { getGoalList }