import focusView from './focus';
import Compose from 'koa-compose';

const views = Compose([focusView]);

export default views;