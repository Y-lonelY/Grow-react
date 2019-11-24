import React from 'react';
import { TriviaState, TriviaData } from '@/index.d.ts';

interface TriviaContext {
    state: TriviaState;
    dispatch: React.Dispatch<any>
}

export const TriviaContext = React.createContext<TriviaContext>({
    state: {
        triviaList: [{
            details: '',
            link: '',
            user: 'yh',
            group: 1,
            name: 'unknown',
        }],
        panelType: '',
        current: -127,
        visible: true,
    },
    dispatch: () => {}
});
