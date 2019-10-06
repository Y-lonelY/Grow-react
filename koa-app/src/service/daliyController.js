// 引入 mysql
import sequelizeCase from "../components/mysqlSequelize"

// sum(leg/belly/chest)
async function getDailySum() {
    const sql = "SELECT SUM(`leg-nums`) AS leg, SUM(`belly-nums`) AS belly, SUM(`chest-nums`) AS chest " 
              + "FROM `gro-up`.`exc_daily` LIMIT 30";
    return await sequelizeCase.query({
        sql: sql,
        queryType: "select"
    })
}

// everyday lists of (leg/belly/chest)
async function getDailyLists() {
    let list = [];
    const sql_leg = "SELECT `leg-nums` AS leg, `date` FROM `gro-up`.`exc_daily` LIMIT 30";
    const sql_belly = "SELECT `belly-nums` AS belly, `date` FROM `gro-up`.`exc_daily` LIMIT 30";
    const sql_chest = "SELECT `chest-nums` AS chest, `date` FROM `gro-up`.`exc_daily` LIMIT 30";
    const sql_daily_list = "SELECT id, date, `leg-nums` AS leg, `belly-nums` AS belly, `chest-nums` AS chest FROM "
                         + "`gro-up`.exc_daily ORDER BY date DESC LIMIT 30";
    // let leg_list = await sequelizeCase.query({ sql: sql_leg, queryType: "select" });
    // let belly_list = await sequelizeCase.query({ sql: sql_belly, queryType: "select" });
    // let chest_list = await sequelizeCase.query({ sql: sql_chest, queryType: "select" });
    let daily_list = await sequelizeCase.query({ sql: sql_daily_list, queryType: "select"});
    // map() create a new array
    // leg_list = leg_list.map(item => {
    //     return {
    //         type: 'leg',
    //         date: item.date,
    //         number: item.leg
    //     }
    // })
    // belly_list = belly_list.map(item => {
    //     return {
    //         type: 'belly',
    //         date: item.date,
    //         number: item.belly
    //     }
    // })
    // chest_list = chest_list.map(item => {
    //     return {
    //         type: 'chest',
    //         date: item.date,
    //         number: item.chest
    //     }
    // })
    list = daily_list;
    return list;
}

export { getDailySum, getDailyLists }