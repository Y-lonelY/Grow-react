import sequelizeCase from "C/mysqlSequelize";

/**
 * 添加专注点记录
 * @param {title} 展示标题
 * @param {details} 展示详细信息
 * @param {start_date} 开始时间
 * @param {end_date} 结束时间
 * @param {pictures} 图片地址列表
 * @param {priority} 优先级
 * @param {status} 状态
 */
async function addFocuxRecord(params) {
    const add_focus_sql = `INSERT INTO
     \`gro-up\`.\`focus\`(\`title\`, \`details\`, \`start_date\`, \`end_date\`, \`pictures\`, \`priority\`, \`status\`) 
     VALUES ('${params.title}', '${params.details}', '${params.start_date}', '${params.end_date}', '${params.pictures}', ${params.priority}, ${params.status});`;
    const add_res = await sequelizeCase.query({ sql: add_focus_sql, queryType: 'insert' });
    return add_res;
}

/**
 * 获取专注点记录
 */
async function getFocusRecord() {
    let list = [];
    const sql = `SELECT * FROM \`gro-up\`.\`focus\``;
    list = await sequelizeCase.query({ sql: sql, queryType: 'select' });
    return list;
}

/**
 * 根据 id 更新记录
 * @param {id} 记录 id
 * @param {title} 展示标题
 * @param {details} 展示详细信息
 * @param {start_date} 开始时间
 * @param {end_date} 结束时间
 * @param {pictures} 图片地址列表
 * @param {priority} 优先级
 * @param {status} 状态
 */
async function updateFocusRecord(params) {
    const sql = `UPDATE \`gro-up\`.\`focus\`
     SET \`title\` = '${params.title}', \`details\` = '${params.details}', \`start_date\` = '${params.start_date}',
      \`end_date\` = '${params.end_date}', \`pictures\` = '${params.pictures}', \`status\` = ${params.status}, 
      \`priority\` = ${params.priority}, \`status\` = ${params.status} 
      WHERE \`id\` = ${params.id};`
    const res = await sequelizeCase.query({ sql: sql, queryType: 'update' });
    return res;
}

export { addFocuxRecord, getFocusRecord, updateFocusRecord };