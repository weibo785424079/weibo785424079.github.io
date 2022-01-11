import React from 'react';
import './index.css';

export const Header = ({ children }: { children: React.ReactNode }) => <div className="header">{children}</div>;

export const Content = ({ children }: { children: React.ReactElement }) => <div className="content">{children}</div>;

export const Footer = ({ children }: { children: React.ReactNode }) => <div className="footer">{children}</div>;

export const Container = ({
  children,
  style,
  footer = null,
  header = null,
  border = false
}: {
  footer?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactElement;
  style?: React.CSSProperties;
  border?: boolean;
}) => {
  return (
    <div className={`site-hook-container-wrapper ${border ? 'border' : ''}`} style={style}>
      {header ? <Header>{header}</Header> : null}
      <Content>{children}</Content>
      {footer ? <Footer>{footer}</Footer> : null}
    </div>
  );
};
Container.defaultProps = {
  footer: null,
  header: null,
  style: {},
  border: false
};
