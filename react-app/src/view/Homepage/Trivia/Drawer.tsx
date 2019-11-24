import React, { useContext } from 'react';
import { TriviaContext } from './context';

export function DrawerContent(props) {
    const { state, dispatch } = useContext(TriviaContext);
    console.log(state);
    return (
        <div>
            ssss
        </div>
    );
}