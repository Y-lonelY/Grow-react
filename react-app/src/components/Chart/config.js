const ExercisePolyline = {
    scale: {
        date: {
            // 为数据属性定义别名，用于图例、坐标轴、tooltip 的个性化显示.
            alias: '日',
            // 数据类型，非连续的时间类型
            type: 'timeCat',
            // 坐标轴两端留白
            range: [0.02, 0.98]
        },
        number: {
            // 连续非线性数据
            type: 'pow'
        }
    }
};

const ExercisePie = {
    scale: {
        percent: {
            formatter: val => {
                val = val * 100 + "%";
                return val;
            }
        }
    }
};

const ProgramColumn = {
    scale: {
        date: {
            // 数据类型，非连续的时间类型
            type: 'time',
            /**
             * range 用来控制坐标轴两边的留白
             * 对于分类数据的坐标轴两边默认会有留白
             * 连续数据的坐标轴的两端没有空白刻度
             * 留白程度通过 range 来控制
             */
            range: [0.1, 0.9]
        }
    }
};

export { ExercisePolyline, ExercisePie, ProgramColumn }