import sequelizeCase from "M/mysqlSequelize";
import util from 'util';
import moment from 'moment';
import request from 'request-promise';

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
        if (stderr !== '' && !stderr.includes('InsecureRequestWarning')) {
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

async function getWakaData({ start, end }) {
    let params = {
        'api_key': 'aa7000e7-273a-4cbe-862c-c3ff4faf2daf',
        'cache': true,
        start,
        end
    };
    let option = {
        uri: 'https://wakatime.com/api/v1/users/current/summaries',
        qs: params,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    const data = (await request(option)).data;
    data.forEach(item => {
        const date = item['range']['date'];
        const lang = item['languages'];
        const pros = item['projects'];
        insertDatabase('waka_lang', date, lang);
        insertDatabase('waka_project', date, pros);
    });
}

async function insertDatabase(name, date, data) {
    if (Array.isArray(data) && data.length > 0) {
        data.forEach(async item => {
            // 大于 100s 的才做记录
            if (Number(item.total_seconds) > 100) {
                const sql = `INSERT INTO \`gro-up\`.\`${name}\`(\`date\`, \`name\`, \`total_seconds\`, \`text\`)
                VALUES('${date}', '${item.name}', ${Number(item.total_seconds)}, '${item.text}');
                `;
                await sequelizeCase.query({ sql: sql, type: 'insert' });
            }
        });
    }
}

export async function setWakaTimeByNode() {
    var res = {
        label: true,
        msg: '同步完成'
    };
    const params = await getDateRange();
    if (params && moment(params.end).isBefore(params.start)) {
        return {
            label: true,
            msg: '已同步'
        }
    }
    try {
        await getWakaData(params);
    } catch (e) {
        res = {
            label: false,
            msg: '同步错误'
        };
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
        const max_date = await sequelizeCase.query({ sql: sql, type: 'select' });

        if (Array.isArray(max_date) && max_date.length > 0) {
            values.push(moment(max_date[0]['date']));
            // 拿到所有数据之后进行处理
            if (index === list.length - 1) {
                params['start'] = moment.max(values).add(1, 'days').format('YYYY-MM-DD');
                return params;
            }
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
    const sql = `SELECT DISTINCT \`name\` FROM \`gro-up\`.`
        + `${params.type === 'project' ? 'waka_project' : 'waka_lang'}`
        + ` WHERE date BETWEEN '${params.start}' AND '${params.end}'`
        + ` ORDER BY name`;
    const nameList = await sequelizeCase.query({ sql: sql, type: 'select' });

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
    const recordList = await sequelizeCase.query({ sql: sql, type: 'select' });

    list = recordList;
    return list;
}

export { getProgramList, getProgramName, setWakaTime }