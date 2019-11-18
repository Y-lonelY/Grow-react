import Router from "koa-router";
import Compose from "koa-compose";
import multer from "@koa/multer";
import middle_compose from 'M/logger';
import utils from 'utility';

const uploadRouter = new Router();
const storage = multer.diskStorage({
    // 文件存放路径
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },
    // 重命名文件
    filename: (req, file, cb) => {
        // 格式化文件后缀
        const fileArray = file.originalname.split('.');
        const prefix = fileArray[0];
        const suffix = fileArray[1];
        // 添加时间戳，避免文件名重复
        cb(null, `${Date.now()}-${utils.md5(prefix)}.${suffix}`);
    }
});
const limits = {
    //非文件字段的数量
    fields: 10,
    //文件大小 单位 b，3M
    fileSize: 10 * 1024 * 1024,
    //文件数量
    files: 1
}

let upload = multer({ storage: storage, limits: limits });

uploadRouter.post('/upload', upload.single('file'), async ctx => {
    try {
        const file = ctx.request.file;
        const results = {
            success: true,
            name: file.originalname,
            status: 'done',
            url: `http://192.168.1.103:7777/pics/${file.filename}`
        };
        ctx.body = results;
    } catch (e) {
        ctx.app.emit('error', e, ctx);
    }
    
});

const router = new Router;
router.use('/service', uploadRouter.routes(), uploadRouter.allowedMethods());

const router_routes = router.routes();
const router_allow_methods = router.allowedMethods();
const uploadCompose = Compose([middle_compose, router_routes, router_allow_methods]);

export default uploadCompose;