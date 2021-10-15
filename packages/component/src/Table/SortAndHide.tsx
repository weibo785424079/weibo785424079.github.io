import React, { useMemo, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { useModal, useImmutable } from '@tms/site-hook';
import { Tabs, Checkbox, Icon } from 'antd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { useTableContext } from './context';
import 'antd/es/tabs/style';

// type Column = TableProps<any>['columns'];

type Props = {
  columns: any;
};

const id2map = (ids: string[]) =>
  ids.reduce((prev, next) => {
    Object.assign(prev, { [next]: true });
    return prev;
  }, {});

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
      {items.map((item, index) => (
        <SortableItem key={item.key} index={index} num={index} value={item.title} />
      ))}
    </ul>
  );
});

const SortAndHideColumn = forwardRef((props: Props, ref) => {
  const { columns } = props;
  /**
   * 获取context数据，把隐藏的数据当做初始化数据，还有排序拖动列
   */
  const { id, hideColumns, orderMap, columns: contextCacheColumns, setCacheState } = useTableContext();
  const [hideIds, setHidesId] = useState(() => [...hideColumns.values()] as string[]);
  const storeHides = useRef(hideIds);

  const [orderedColumns, setOrderedColumns] = useState(() => {
    const sortColumns = [...columns];
    sortColumns.sort((a, b) => {
      const aSort = orderMap.get(a.key) ?? Infinity;
      const bSort = orderMap.get(b.key) ?? Infinity;
      return aSort - bSort;
    });
    let index = 0;
    sortColumns.forEach((col) => {
      if (Number.isNaN(col.order) && col.order !== undefined) {
        index = col;
      } else {
        index += 1;
        Object.assign(col, {
          order: index// eslint-disable-line
        });
      }
    });
    return sortColumns;
  });

  console.log(orderedColumns);

  const hides = useMemo(() => {
    return id2map(hideIds);
  }, [hideIds]);

  useImperativeHandle(ref, () => {
    return {
      onOk() {
        // 找出不同
        const storeIdMap = id2map(storeHides.current);

        const added: string[] = [];
        const deled: string[] = [];

        storeHides.current.forEach((key) => {
          if (!hides[key]) {
            deled.push(key);
          }
        });
        hideIds.forEach((key) => {
          if (!storeIdMap[key]) {
            added.push(key);
          }
        });
        // 将新增的项目隐藏， 将减少的项目显示
        const newCacheColumns = [...contextCacheColumns];

        added.forEach((key) => {
          const one = newCacheColumns.find((item) => item.key === key);
          if (one) {
            one.show = 0;
          } else {
            newCacheColumns.push({
              key,
              show: 0,
              order: NaN
            });
          }
        });
        deled.forEach((key) => {
          const one = newCacheColumns.find((item) => item.key === key);
          if (one) {
            one.show = 1;
          } else {
            newCacheColumns.push({
              key,
              show: 1,
              order: NaN
            });
          }
        });
        setCacheState({
          id,
          columns: newCacheColumns
        });
      }
    };
  });
  const renderOrderColumns = orderedColumns.filter((item: any) => !hides[String(item?.key)]);
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
          items={renderOrderColumns}
          onSortEnd={({ newIndex, oldIndex }) => {
            // const arr = oldIndex < newIndex ? [] : [];
            console.log(oldIndex, newIndex);
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

export default SortAndHideColumn;
