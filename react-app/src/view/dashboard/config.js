const dailyListChart = {
    scale: {
        date: {
            // 为数据属性定义别名，用于图例、坐标轴、tooltip 的个性化显示.
            alias: '日',
            // 数据类型，非连续的时间类型
            type: 'timeCat',
            // 坐标轴两端留白
            range: [0, 0.98]
        },
        number: {
            // 连续非线性数据
            type: 'pow'
        }
    }
};

const dailySumChart = {
    scale: {
        percent: {
            formatter: val => {
                val = val * 100 + "%";
                return val;
            }
        }
    }
};

export { dailyListChart, dailySumChart }