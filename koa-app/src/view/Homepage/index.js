import focusView from './focus';
import triviaView from './trivia';
import Compose from 'koa-compose';

const views = Compose([focusView, triviaView]);

export default views;