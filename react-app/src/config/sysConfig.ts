interface systemConfig {
    useMock: string;
    hugeScreen: boolean;
    isdevelop: boolean;
}

const config: systemConfig = {
    // 是否使用虚拟数据
    useMock: window.sessionStorage.getItem("useMock") === null ? 'true' : window.sessionStorage.getItem("useMock"),

    // 是否大屏
    hugeScreen: window.screen.availWidth > 1800 ? true : false,

    // 是否是开发环境
    isdevelop: process.env.NODE_ENV === 'development' ? true : false,
};

function setUseMock(value: boolean) {
    window.sessionStorage.setItem("useMock", String(value));
    window.location.reload();
}

export { config, setUseMock } 