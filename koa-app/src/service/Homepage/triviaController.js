import sequelizeCase from "M/mysqlSequelize";

/**
 * 获取 trivia group list
 */
async function getTriviaGroupList() {
    const sql = 'SELECT id, `name`, `status` FROM `gro-up`.trivia_group';
    const res = await sequelizeCase.query({
        sql: sql,
        type: 'select'
    });
    return res;
}

/**
 * 修改 trivia group name/status
 * @param {id} 记录id
 * @param {name} 记录名称
 * @param {status} 是否允许修改
 */
async function updateTriviaGroupList(params) {
    const sql = `UPDATE \`gro-up\`.\`trivia_group\` 
    SET \`name\` = '${params.name}',
    \`status\` = ${params.status} 
    WHERE
        \`id\` = ${params.id};`;
    const res = await sequelizeCase.query({
        sql: sql,
        type: 'update'
    });
    return res;
}

/**
 * 添加 trivia group record
 * @param {name} 记录名称
 * @param {status} 是否允许修改
 */
async function addTriviaGroupList(params) {
    const sql = `INSERT INTO \`gro-up\`.\`trivia_group\` (\`name\`, \`status\` )
    VALUES
        ('${params.name}', ${params.status});`;
    const res = await sequelizeCase.query({
        sql: sql,
        type: 'insert'
    });
    return res;
}

/**
 * 添加 trivia trcoed
 * @param {details} 详情
 * @param {link} 相关连接
 * @param {status} 是否展示
 * @param {user} 最后修改者
 * @param {group} 所在分组
 */
export async function addTriviaList(params) {
    const sql = `INSERT INTO \`gro-up\`.\`trivia\` (\`details\`, \`link\`, \`status\`, \`user\`, \`group\`)
    VALUES
        ('${params.details}', '${params.link}', ${params.status}, '${params.user}', ${params.group});`
    const res = sequelizeCase.query({
        sql: sql,
        type: 'insert'
    });
    return res;
}

/**
 * 修改 trivia trcoed
 * @param {id} 记录 id
 * @param {details} 详情
 * @param {link} 相关连接
 * @param {status} 是否展示
 * @param {user} 最后修改者
 * @param {group} 所在分组
 */
export async function updateTriviaList(params) {
    const sql = `UPDATE \`gro-up\`.\`trivia\` 
    SET \`details\` = '${params.details}',
    \`link\` = '${params.link}',
    \`status\` = ${params.status},
    \`user\` = '${params.user}',
    \`group\` = ${params.group}
    WHERE
        \`id\` = ${params.id};`
    const res = sequelizeCase.query({
        sql: sql,
        type: 'update'
    });
    return res;
}


export { getTriviaGroupList, updateTriviaGroupList, addTriviaGroupList }
