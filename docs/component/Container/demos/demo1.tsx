import React from 'react';
import { Container } from '@tms/site-component';

export default () => (
  <Container border header="标题" footer={<div>这是底部</div>}>
    <div>这是内容</div>
  </Container>
);
