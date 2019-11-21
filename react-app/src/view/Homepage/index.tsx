import React from 'react';
import { LocaleContext } from '@/cluster/context';
import FocusView from './Focus';
import TriviaView  from './Trivia';
import './index.scss';

/**
 * home component 主要采用 react hook 来完成
 */

function HomepageView() {
    return (
        <LocaleContext.Consumer>
            {({ assets }) => {
                const homepageConfig = assets.homepageConfig;
                
                return (
                    <div className='homepage'>
                        <FocusView head={homepageConfig.focus} />
                        <TriviaView head={homepageConfig.trivia} />
                    </div>
                );
            }}
        </LocaleContext.Consumer>
    );
}

export default HomepageView;