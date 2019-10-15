import sequelizeCase from "../components/mysqlSequelize";

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
        list = goal_list.concat();
    } catch (e) {
        console.log(e);
    }

    return list;
}

export { getGoalList }