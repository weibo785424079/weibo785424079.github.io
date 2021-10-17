/* eslint-disable no-param-reassign */
import React, { useMemo, useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { useModal, useImmutable } from '@tms/site-hook';
import { Tabs, Checkbox, Icon } from 'antd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { useTableContext, ModalContext, useModalContext } from './context';
import type { Column } from './Cache';
import 'antd/es/tabs/style';

const id2map = (ids: string[]) =>
  ids.reduce((prev, next) => {
    Object.assign(prev, { [next]: true });
    return prev;
  }, {});

const key2orderMap = (arr: Column[]) => {
  return arr.reduce((prev, next, index) => {
    prev[next.key] = index;
    return prev;
  }, {});
};

const SortableItem = SortableElement(({ value, num }) => (
  <li
    style={{
      height: '44px',
      cursor: 'pointer',
      paddingLeft: '20px',
      paddingTop: '10px',
      background: num % 2 ? '#F8F8FA' : '#FFF',
      zIndex: 9999,
      listStyleType: 'none'
    }}
  >
    <Icon type="unordered-list" />
    <span style={{ marginLeft: 20 }}>{value}</span>
  </li>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul style={{ margin: 0, padding: 0, maxHeight: 300, overflowY: 'auto' }}>
      {items.map((item, index: number) => (
        <SortableItem key={item.key} index={index} num={index} value={item.title} />
      ))}
    </ul>
  );
});

/**
 * 获取context数据，把隐藏的数据当做初始化数据，还有排序拖动列
 */
const SortAndHideColumn = forwardRef((props: any, ref) => {
  const { columns } = props;

  const { id, hideColumns, orderMap, columns: cacheColumns, setCacheState } = useTableContext();
  const [hideIds, setHidesId] = useState(() => [...hideColumns.values()] as string[]);

  const [orderedColumns] = useState(() => {
    const sortColumns = [...columns]; // 将现传入的column order格式化
    sortColumns.sort((a, b) => {
      const aSort = orderMap.get(a.key) ?? Infinity;
      const bSort = orderMap.get(b.key) ?? Infinity;
      return aSort - bSort;
    });
    const list = sortColumns.map((item, index) => {
      return {
        ...item,
        order: index
      };
    });
    return list;
  });

  const hides = useMemo(() => {
    return id2map(hideIds);
  }, [hideIds]);

  const [renderColumns, setRenderColumns] = useState(orderedColumns);

  useEffect(() => {
    setRenderColumns((arr) => arr.filter((item: any) => !hides[String(item?.key)]));
  }, [hides]);

  useImperativeHandle(ref, () => {
    return {
      onOk() {
        const currOrderMap = key2orderMap(renderColumns);

        const curr: Column[] = [];
        columns.forEach((item) => {
          const col = {
            ...(cacheColumns.find((i) => i.key === item.key) || {}),
            key: item.key,
            show: (hideIds.includes(item.key) ? 0 : 1) as Column['show'],
            order: currOrderMap[item.key] ?? NaN
          };
          curr.push(col);
        });

        setCacheState({
          id,
          columns: curr
        });
      }
    };
  });

  return (
    <Tabs defaultActiveKey="all">
      <Tabs.TabPane key="all" tab="全部列">
        <Checkbox.Group
          value={hideIds}
          onChange={(val: string[]) => {
            setHidesId(val);
          }}
        >
          {columns.map((item: any) => (
            <div key={item.key} className="item">
              <Checkbox value={item.key!} /> {item.title || '-'}
            </div>
          ))}
        </Checkbox.Group>
      </Tabs.TabPane>
      <Tabs.TabPane key="sort" tab="排序">
        <SortableList
          items={renderColumns}
          onSortEnd={({ newIndex, oldIndex }) => {
            const currColumns = [...renderColumns];
            const one = currColumns.splice(oldIndex, 1)[0];
            currColumns.splice(newIndex, 0, one);
            setRenderColumns(currColumns);
          }}
        />
      </Tabs.TabPane>
    </Tabs>
  );
});

export const useSortHideColumn = () => {
  const ref = useRef<{ onOk: () => void }>(null);
  const { RenderModal, hide, ...rest } = useModal({
    className: 'site-component-cache-table-modal',
    title: '列排序',
    cancelText: '取消',
    okText: '保存',
    onOk() {
      ref.current?.onOk();
      hide();
    }
  });
  const RenderSortHideColumn = useImmutable(() => {
    return <RenderModal>{(columns) => <SortAndHideColumn ref={ref} columns={columns} />}</RenderModal>;
  });
  return { RenderSortHideColumn, hide, ...rest };
};

export const SortTableContainer = ({ children, columns = [] }: { children: React.ReactElement; columns: any[] }) => {
  const { RenderSortHideColumn, show } = useSortHideColumn();
  const ref = useRef(columns);
  ref.current = columns;
  // @ts-ignore
  const value = useMemo(() => ({ show: () => show(ref.current) }), [show]);
  return (
    <ModalContext.Provider value={value as any}>
      <>
        {children}
        <RenderSortHideColumn />
      </>
    </ModalContext.Provider>
  );
};

export const SortTableTrigger = ({ children }: { children: React.ReactElement }) => {
  const { show } = useModalContext();
  return React.cloneElement(children, { onClick: () => show() });
};

export default SortAndHideColumn;
