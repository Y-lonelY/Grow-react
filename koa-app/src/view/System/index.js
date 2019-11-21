import ErrorView from './error';
import UploadView from './upload';
import Compose from 'koa-compose';

const views = Compose([ErrorView, UploadView]);

export default views;