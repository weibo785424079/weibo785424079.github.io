import React, { ReactElement } from 'react';
import './index.less';

interface Operation {
    text: string;
    action?: (...args: any[]) => void;
    visible?: boolean;
    disable?: boolean;
    style?: React.CSSProperties;
    render?: (children: ReactElement, item: Operation) => ReactElement;
}

export const Operations = ({ meta }: { meta: Array<Operation> }) => {
    return (
        <div className="c-operation-list">
            {
                meta
                    .filter((item) => item.visible !== false)
                    .map((item) => {
                        const { text, action, render, disable = false, style = {} } = item;

                        const children = (
                            <span key={text} style={style} onClick={() => action?.()} className={`item ${disable ? 'disabled' : ''}`} >
                                {text}
                            </span>
                        );

                        if (typeof render === 'function') {
                            return render(children, item);
                        }
                        return children;
                    })}
        </div>
    );
};
