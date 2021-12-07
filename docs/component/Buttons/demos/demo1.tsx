import React from 'react';
import { Buttons, IButtonsItem } from '@tms/site-component';

export default () => {
  const btnMeta: IButtonsItem[] = [
    {
      text: '驳回',
      visible: true,
      disabled: true,
      onClick: () => {
        console.log('驳回');
      }
    },
    {
      text: '审核',
      type: 'primary',
      visible: true,
      disabled: false,
      onClick: () => {
        console.log('审核');
      }
    }
  ];
  return (
    <div>
      <Buttons meta={btnMeta} />
    </div>
  );
};
