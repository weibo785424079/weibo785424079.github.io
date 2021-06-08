import React from 'react';
import ReactDOM from 'react-dom';
import { Inspector } from '@tms/react-dev-inspector';
import App from './app';

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

ReactDOM.render(
    <InspectorWrapper keys={['control', 'shift', 'x', 'c']}>
        <App />
    </InspectorWrapper>,
    document.getElementById('root'),
);
