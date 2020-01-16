module.exports = {
    "root": true,
    "env": {
        "node": true
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    // 0-打印 1-警告 2-错误
    "rules": {
        // 使用控制台打印
        "no-console": "off",
        // 不使用分号
        "semi": [1, "never"]
    },
    "parserOptions": {
        "parser": "babel-eslint"
    }
}