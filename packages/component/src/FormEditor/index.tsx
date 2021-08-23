import React, { useImperativeHandle, forwardRef, useEffect } from 'react';
import { useEditor } from '@tms/site-hook';

export interface Props {
  value: string;
  defaultValue: string;
  onChange: (s: string | void) => void;
}

const FormEditor = forwardRef(({ onChange, value, defaultValue = '' }: any, propRef) => {
  useImperativeHandle(propRef, () => ({}));

  const [Editor, { getValue, setValue }] = useEditor(() => {
    onChange(getValue());
  }, defaultValue || value);

  useEffect(() => {
    if (value !== getValue()) {
      setValue(value);
    }
  });

  return <Editor />;
});

export default FormEditor;
