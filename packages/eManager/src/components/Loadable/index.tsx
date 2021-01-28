import ReactLoadable from 'react-loadable';

const Loadable = (loader: () => Promise<any>) => {
    return ReactLoadable({
        loader,
        delay: 100,
        loading: () => null
    });
};

export default Loadable;
