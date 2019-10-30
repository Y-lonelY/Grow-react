import sequelizeCase from "C/mysqlSequelize";
import util from 'util';

const exec = util.promisify(require('child_process').exec);

/**
 * 执行 python 脚本，更新 wakatime
 * @param {start} params 开始时间
 * @param {end} params 结束时间
 */
async function setWakaTime(params) {
    let label = false;
    try {
        const cmd = `python3 scripts/wakatime/wakatime.py ${params.start} ${params.end} False`;
        const { stdout, stderr } = await exec(cmd);
        if (stdout !== '') {
            console.log(`stderr: ${stderr}`);
            label = true;
        }
    } catch (e) {
        console.log(e);
    }
    return label;
}


/**
 * 获取时间段内类型列表
 * @param {start} params 开始时间
 * @param {end} params 结束时间
 * @param {type} params 查询类型 project or languages
 */
async function getProgramName(params) {
    let list = [];
    const sql = `SELECT DISTINCT \`name\` FROM \`gro-up\`.`
              + `${params.type === 'project' ? 'waka_project' : 'waka_lang'}`
              + ` WHERE date BETWEEN '${params.start}' AND '${params.end}'`
              + ` ORDER BY name`;
    try {
        const nameList = await sequelizeCase.query({ sql: sql, queryType: 'select'});
        list = nameList;
    } catch (e) {
        console.log(e);
    }
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