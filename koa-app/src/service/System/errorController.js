import sequelizeCase from "C/mysqlSequelize";

/**
 * 插入错误记录
 */
async function addErrorsRecord(params) {
    const add_sql = `INSERT INTO \`gro-up\`.\`gu_errors\` `
                  + `( \`username\`, \`project\`, \`path\`, `
                  + `\`referrer\`, \`event\`, \`type\`, \`level\`, `
                  + `\`stack\`, \`message\`, \`origin\`, \`useragent\`, `
                  + `\`network\`, \`appversion\` )`
                  + ` VALUES `
                  + `( '${params.username}', '${params.project}', '${params.path}', `
                  + `'${params.referrer}', '${params.event}', '${params.type}', `
                  + `${params.level}, '${params.stack}', '${params.message}', `
                  + `'${params.origin}', '${params.useragent}', '${params.network}', '${params.appversion}' );`;
    try {
        const add_record = await sequelizeCase.query({ sql: add_sql, queryType: 'insert' });
        return add_record;
    } catch (e) {
        console.log(e);
    }
}

export { addErrorsRecord };