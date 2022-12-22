import React, { useState, useRef } from 'react';
import { useMount, useUpdate, useScroll, useWatch } from '@tms/site-hook';
import Affix from 'antd/es/affix';
import { AnchorLoadContext } from './Context';
import AnchorLoadExector from './Exector';
import './index.css';

interface Props {
  children: React.ReactNode;
  exector?: AnchorLoadExector;
  defaultExpand?: boolean;
  linkStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  scrollContainer: React.RefObject<HTMLElement>;
}

export const AnchorLoad = React.forwardRef<{ scrollTo: (id: string) => void }, Props>(
  ({ children, exector: propExector, defaultExpand, linkStyle, style, scrollContainer }: Props, ref) => {
    const [expand, setExpand] = useState(defaultExpand!);

    // 锚点集合
    const anchors: Array<{ id: string; title: string }> = [];

    const lock = useRef(false);
    const timer = useRef<any>(null);

    const content = useRef<HTMLDivElement>(null);

    const { top } = useScroll(scrollContainer);

    useWatch(top, () => {
      if (!anchors.length || !content.current || lock.current) return;
      // eslint-disable-next-line
      for (const item of anchors) {
        const target = document.getElementById(item.id);
        if (target && Math.abs(top - target.offsetTop) < 100) {
          if (item.id !== active) {
            setActive(item.id);
          }
          break;
        }
      }
    });

    const update = useUpdate();

    const scrollTo = (id: string) => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView();
    };

    const [exector] = useState(() => propExector || new AnchorLoadExector().init(update));

    React.useImperativeHandle(
      ref,
      () => ({
        scrollTo,
        exector
      }),
      [scrollTo, exector]
    );

    React.Children.forEach(children, (item) => {
      if (React.isValidElement(item)) {
        const { title, id } = item.props;
        if (title && id) {
          anchors.push({
            title,
            id
          });
        }
      }
    });

    const [active, setActive] = useState(anchors[0]?.id);

    const load = (id?: string) => {
      if (id) {
        exector.load(id);
      } else {
        exector.loadNext();
      }
    };

    const onLink = (id: string) => {
      try {
        lock.current = true;
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          lock.current = false;
          timer.current = null;
        }, 1000);
        load(id);
        setActive(id);
        scrollTo(id);
      } catch (e) {
        console.log(e);
      }
    };

    const loadNext = () => load();

    useMount(() => {
      exector.mount();
    });

    const renderMain = () => {
      return (
        <div ref={content} className="site-anchorload-content">
          {React.Children.map(children, (item) => {
            if (React.isValidElement(item)) {
              return React.cloneElement(item, {
                visible: exector.hasLoad(item.props.id),
                exector
              });
            }
            return item;
          })}
        </div>
      );
    };

    const renderLinks = () => {
      const links = anchors.map((item) => (
        <div className={`item ${active === item.id ? 'active' : ''}`} key={item.id}>
          <span style={{ cursor: 'pointer' }} onClick={() => onLink(item.id)}>
            {item.title}
          </span>
        </div>
      ));
      return (
        <div style={linkStyle} className={`site-anchorload-links ${expand ? 'expand' : 'shrink'}`}>
          <Affix target={() => scrollContainer.current}>
            <div style={{ paddingTop: 48 }}>
              <span onClick={() => setExpand((c) => !c)} className={`indicator ${expand ? 'expand' : ''}`} />
              {expand ? links : null}
            </div>
          </Affix>
        </div>
      );
    };
    return (
      <AnchorLoadContext.Provider
        value={{
          load,
          loadNext,
          setExpand,
          expand,
          exector
        }}
      >
        <div style={style} className="site-anchorload">
          {renderMain()}
          {renderLinks()}
        </div>
      </AnchorLoadContext.Provider>
    );
  }
);

AnchorLoad.defaultProps = {
  exector: undefined,
  defaultExpand: true,
  linkStyle: {},
  style: {}
};

export default AnchorLoad;
