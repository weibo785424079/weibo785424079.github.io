import { hot } from 'react-hot-loader/root';
import React from 'react';
// import ReactDOM from 'react-dom';
// import { Inspector } from 'react-dev-inspector';

// const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const App = () => <div>hello esite</div>;

const HotApp = hot(App);

// ReactDOM.render(
//     <InspectorWrapper
//         keys={['control', 'shift', 'command', 'c']} // default keys
//     >
//         <HotApp />
//     </InspectorWrapper>,
//     document.getElementById('root'),
// );
export default HotApp;
