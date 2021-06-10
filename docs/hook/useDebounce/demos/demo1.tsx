import React, { useState } from 'react';
import { useDebounce } from '@tms/site-hook';
import Button from 'antd/es/button';

export default () => {
  const [count, setCount] = useState(0);
  const deouncedCount = useDebounce(count, 1000);
  return (
    <div>
      <Button onClick={() => setCount((c) => c + 1)}>点击</Button>
      <div>
        {`count: ${count}, debouncedCount: ${deouncedCount}`}
      </div>
    </div>
  );
};
