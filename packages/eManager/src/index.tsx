import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import { Inspector } from 'react-dev-inspector';
import App from './app'
const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const HotApp = hot(App);

console.log(process.env.esite)

ReactDOM.render(
    <InspectorWrapper
        keys={['control', 'shift', 'command', 'c']} // default keys
    >
        <HotApp />
    </InspectorWrapper>,
    document.getElementById('root'),
);
