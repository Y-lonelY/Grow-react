import sequelizeCase from "C/mysqlSequelize";
import util from 'util';
import moment from 'moment';

const exec = util.promisify(require('child_process').exec);

/**
 * 执行 python 脚本，更新 wakatime
 * 同步逻辑：从上次同步日期 + 1 < 昨天，则进行同步
 * 从上次同步日期 + 1 = 昨天，则返回相应信息
 * @param {start} params 开始时间
 * @param {end} params 结束时间
 */
async function setWakaTime() {
    let res = {
        label: true,
        msg: '同步完成'
    };
    try {
        const params = await getDateRange();
        if (params && moment(params.end).isBefore(params.start)) {
            res.label = true;
            res.msg = '已同步';
        }
        const cmd = `python3 scripts/wakatime/wakatime.py ${params.start} ${params.end} True`;
        const { stdout, stderr } = await exec(cmd);
        if (stderr !== '') {
            console.log(`stderr: ${stderr}`);
            res.label = false;
        }
    } catch (e) {
        console.log(e);
        res.label = false;
    } finally {
        return res;
    }
}

async function getDateRange() {
    const list = ['lang', 'project'];
    const values = [];
    // end date
    const params = {
        end: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    };

    for (let index = 0; index < list.length; index++) {
        const item = list[index];
        const sql = `SELECT MAX(date) AS date FROM waka_${item}`;
        try {
            const max_date = await sequelizeCase.query({ sql: sql, queryType: 'select'});
            if (Array.isArray(max_date) && max_date.length > 0) {
                values.push(moment(max_date[0]['date']));
                // 拿到所有数据之后进行处理
                if (index === list.length - 1) {
                    params['start'] = moment.max(values).add(1, 'days').format('YYYY-MM-DD');
                    return params;
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}


/**
 * 获取时间段内类型列表
 * @param {start} params 开始时间
 * @param {end} params 结束时间
 * @param {type} params 查询类型 project or languages
 */
async function getProgramName(params) {
    let list = [];
    const sql = `SELEC DISTINCT \`name\` FROM \`gro-up\`.`
              + `${params.type === 'project' ? 'waka_project' : 'waka_lang'}`
              + ` WHERE date BETWEEN '${params.start}' AND '${params.end}'`
              + ` ORDER BY name`;
    const nameList = await sequelizeCase.query({ sql: sql, queryType: 'select'});
    list = nameList;
    return list;
}

/**
 * 获取时间段内编程记录
 * @params {start} params 开始时间
 * @params {end} params 结束时间
 * @params {type} params 查询类型
 */
async function getProgramList(params) {
    let list = [];
    const sql = `SELECT id, date, \`name\`, total_seconds AS value`
              + ` FROM \`gro-up\`.${params.type === 'project' ? 'waka_project' : 'waka_lang'}`
              + ` WHERE`
              + ` date BETWEEN '${params.start}' AND '${params.end}'`
              + ` ORDER BY date`;
    try {
        const recordList = await sequelizeCase.query({ sql: sql, queryType: 'select'});
        list = recordList;
    } catch (e) {
        console.log(e);
    }
    return list;
}

export { getProgramList, getProgramName, setWakaTime }