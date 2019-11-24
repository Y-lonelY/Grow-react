export const locale = {
    'zh_cn': {
        mainTitle: 'growth',
        mock: '虚拟数据',
        add: '添加',
        edit: '编辑',
        cancel: '取消',
        submit: '确认',
        title: '标题',
        start: '开始',
        end: '结束',
        details: '详情',
        status: '状态',
        priority: '优先级',
        pistures: '图片',
        normalize: '归一化',
        denormalization: '去归一化',
        update: '同步',
        all: '全部',
        headerItems: [{
            id: 1,
            label: '勤练',
            type: 'item',
            target: '/practice',
        }, {
            id: 2,
            label: '项目',
            type: 'item',
            target: null
        }, {
            type: 'seperator'
        }, {
            id: 3,
            label: '博客',
            type: 'link',
            target: 'https://y-lonely.github.io/BlogFlows/',
            icon: 'blog'
        }, {
            id: 4,
            label: 'github',
            type: 'link',
            target: 'https://github.com/Y-lonelY',
            icon: 'github'
        }],
        practiceConfig: {
            exercise: {
                icon: {
                    type: 'icon-jianshen',
                    style: {
                        fontSize: '18px'
                    }
                },
                title: '练习',
            },
            program: {
                icon: {
                    type: 'icon-code',
                    style: {
                        fontSize: '16px'
                    }
                },
                title: '编程',
            }
        },
        homepageConfig: {
            focus: {
                icon: {
                    type: 'icon-mubiao',
                    style: {
                        fontSize: '18px'
                    }
                },
                title: '聚焦',
                showAddBtn: false,
            },
            trivia: {
                icon: {
                    type: 'icon-mubiao',
                    style: {
                        fontSize: '18px'
                    }
                },
                title: '知识碎片',
                showAddBtn: false,
            }
        },
        priorityList: {
            1: '极高',
            2: '较高',
            3: '较低',
            4: '极低',
        }
    },
    'en_us': {
        mainTitle: 'growth',
        mock: 'use mock',
        add: 'add',
        edit: 'edit',
        cancel: 'cancel',
        submit: 'submit',
        title: 'title',
        start: 'start',
        end: 'end',
        details: 'details',
        status: 'status',
        priority: 'priority',
        pistures: 'pistures',
        normalize: 'normalize',
        denormalization: 'denormalization',
        update: 'update',
        all: 'all options',
        headerItems: [{
            id: 1,
            label: 'practice',
            type: 'item',
            target: '/practice',
        }, {
            id: 2,
            label: 'project',
            type: 'item',
            target: null
        }, {
            type: 'seperator'
        }, {
            id: 3,
            label: 'blog',
            type: 'link',
            target: 'https://y-lonely.github.io/BlogFlows/',
            icon: 'blog'
        }, {
            id: 4,
            label: 'github',
            type: 'link',
            target: 'https://github.com/Y-lonelY',
            icon: 'github'
        }],
        practiceConfig: {
            exercise: {
                icon: {
                    type: 'icon-jianshen',
                    style: {
                        fontSize: '18px'
                    }
                },
                title: 'exercise',
            },
            program: {
                icon: {
                    type: 'icon-code',
                    style: {
                        fontSize: '16px'
                    }
                },
                title: 'program',
            }
        },
        homepageConfig: {
            focus: {
                icon: {
                    type: 'icon-mubiao',
                    style: {
                        fontSize: '18px'
                    }
                },
                title: 'focus',
                showAddBtn: false,
            },
            trivia: {
                icon: {
                    type: 'icon-mubiao',
                    style: {
                        fontSize: '18px'
                    }
                },
                title: 'trivia',
                showAddBtn: false,
            },
        },
        priorityList: {
            1: 'highest',
            2: 'high',
            3: 'low',
            4: 'lowest',
        }
    }
}