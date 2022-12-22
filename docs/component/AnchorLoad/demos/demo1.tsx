import React, { useRef } from 'react';
import {
  AnchorLoad,
  AnchorLoadContext,
  AnchorLoadExector,
  AnchorViewLoadItem,
  AnchorSyncLoadItem,
  AnchorQueueLoadItem
} from '@tms/site-component';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { loadNext } = React.useContext(AnchorLoadContext);

  return (
    <div>
      <button type="button" onClick={() => loadNext()}>
        加载
      </button>
      {children}
    </div>
  );
};

const Demo = () => {
  const exector = AnchorLoadExector.useExector();
  const ref = useRef<HTMLDivElement>(null);
  console.log('render demo', exector);
  return (
    <div ref={ref} style={{ height: 500, overflow: 'auto', border: '1px solid #ccc' }}>
      <AnchorLoad scrollContainer={ref} exector={exector}>
        <div>全部加载了: {exector.ready ? '是' : '否'}</div>
        <button type="button" onClick={() => exector.loadAll()}>
          加载全部
        </button>
        <AnchorSyncLoadItem id="form" title="表单">
          <div>这是表单的内容</div>
        </AnchorSyncLoadItem>
        <AnchorSyncLoadItem id="file" title="文件">
          <div>文件</div>
        </AnchorSyncLoadItem>
        <AnchorQueueLoadItem id="queue1" title="title队列加载1">
          <Wrapper>
            <div>队列加载1</div>
          </Wrapper>
        </AnchorQueueLoadItem>
        <AnchorQueueLoadItem id="queue2" title="title队列加载2">
          <Wrapper>
            <div>队列加载2</div>
          </Wrapper>
        </AnchorQueueLoadItem>
        <AnchorSyncLoadItem id="workflow" title="审批流程">
          <div>审批流程</div>
        </AnchorSyncLoadItem>
        <AnchorViewLoadItem id="history" title="历史">
          <div>历史</div>
        </AnchorViewLoadItem>
      </AnchorLoad>
    </div>
  );
};

export default Demo;
