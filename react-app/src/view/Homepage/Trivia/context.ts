import React from 'react';
import { TriviaState } from '@/index.d.ts';

interface TriviaContext {
    state: TriviaState;
    dispatch: React.Dispatch<any>
}

export const TriviaContext = React.createContext<TriviaContext>({
    state: {
        triviaList: [],
        groupList: [],
        groupMap: {},
        group: -127,
        panelType: '',
        current: -127,
        visible: true,
    },
    dispatch: () => {}
});
