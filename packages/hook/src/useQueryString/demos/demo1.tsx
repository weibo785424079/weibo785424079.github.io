import React from 'react';
import { useQueryString } from '@tms/site-hook';

export default () => {
  const { id = '' } = useQueryString();
  return (
    <div>
      <div>
        {`页面query id: ${id}`}
      </div>
    </div>
  );
};
