import exerciseView from './exercise';
import programView from './program';
import Compose from 'koa-compose';

const views = Compose([exerciseView, programView]);

export default views;