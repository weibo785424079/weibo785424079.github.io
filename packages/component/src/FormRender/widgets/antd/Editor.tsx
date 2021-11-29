/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useImperativeHandle, forwardRef, useEffect, useRef } from 'react';
import { useEditor, useWatch } from '@tms/site-hook';

export interface Props {
  value: string;
  onChange: (s: string | void) => void;
}

const FormEditor = ({ onChange, value, onFilter }: any, ref) => {
  const initied = useRef(true);
  const [Editor, { getValue, setValue }] = useEditor(() => {
    // 第一次渲染不调onChange方法
    if (initied.current) {
      initied.current = false;
      return;
    }
    if (typeof onFilter === 'function') {
      onChange(onFilter(getValue()));
      return;
    }
    onChange(getValue());
  }, value);
  useWatch(value, () => {
    if (value !== getValue()) {
      setValue(value);
    }
  });

  return <Editor />;
};

export default forwardRef(FormEditor);
