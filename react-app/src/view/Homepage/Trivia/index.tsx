import React, { useContext } from 'react';
import { LocaleContext } from '@/cluster/context';
import { Header } from '@/components/Override';

function TriviaView(props) {
    const { locale, assets } = useContext(LocaleContext);
    return (
        <div className='triviaView'>
            <Header {...props.head} />
        </div>
    );
}

export default TriviaView;