interface systemConfig {
    useMock: boolean,
    hugeScreen: boolean
}

const config: systemConfig = {
    // 是否使用虚拟数据
    useMock: false,

    // 是否大屏
    hugeScreen: window.screen.availWidth > 1800 ? true : false,
}

export default config