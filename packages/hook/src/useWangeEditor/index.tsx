import React, { useEffect, useRef } from 'react';
import WangEditor from 'wangeditor';
import { commonUpload } from '@tms/fs.js';
import usePersistFn from '../usePersistFn';
import './index.css';

const repositoryName = 'hospital/site-front-repo';

export const fsUpload = async (file: File | File[], processor = 'resources' as const) => {
  return commonUpload({
    repositoryName,
    fileList: Array.isArray(file) ? file : [file],
    processor
  });
};

const useEditor = (
  onChange: (s: string | void) => void,
  defaultValue: string,
  menus = [
    'head',
    'bold',
    'fontSize',
    'fontName',
    'italic',
    'underline',
    'foreColor',
    'backColor',
    'link',
    'list',
    'justify',
    'quote',
    'emoticon',
    'image',
    'undo',
    'redo',
    'qgs'
  ]
) => {
  const toolbarRef = useRef<any>(null);
  const editorRef = useRef<any>(null);
  const editorToolRef = useRef<any>(null);
  const update = usePersistFn(onChange);

  const init = (val: string = '') => {
    const editorHtml = val;
    const editor = new WangEditor(toolbarRef.current, editorRef.current);
    editorToolRef.current = editor;
    editor.config.zIndex = 1;
    editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
      try {
        if (resultFiles && resultFiles[0]) {
          const data = await fsUpload(resultFiles[0]);
          if (data?.data?.[0]?.previewUrl) {
            insertImgFn(data.data[0].previewUrl);
          }
        }
      } catch (error) {
        console.log(error); // eslint-disable-line
      }
    };
    editor.config.onchange = update;
    editor.config.menus = menus;
    editor.create();
    editor.txt.html(editorHtml);
  };

  const setValue = (editorHtml: string) => {
    if (editorToolRef.current) {
      editorToolRef.current.txt?.html(editorHtml);
    } else {
      init(editorHtml);
    }
  };

  const getValue = (): string | void => {
    if (editorToolRef.current) {
      let value = editorToolRef.current.txt?.html();
      // 默认值<p><br></p>
      if (value === '<p><br/></p>') {
        value = '';
      }
      return value;
    }
  };

  useEffect(() => {
    init(defaultValue);
  }, []);

  const Editor = useRef(() => (
    <div className="site-hook-my-edit-wrapper">
      <div ref={toolbarRef} className="toolbar" />
      <pre ref={editorRef} className="my-text-area" />
    </div>
  )).current;

  return [Editor, { setValue, getValue, editor: editorRef.current, editorTool: editorToolRef.current }] as const;
};

export default useEditor;
