/* eslint-disable no-param-reassign */
import React, { useMemo, useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Tabs, Checkbox, Icon, Radio, Button } from 'antd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { useModal, useImmutable } from '@tms/site-hook';
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
      listStyleType: 'none',
      display: 'flex',
      justifyContent: 'space-between'
    }}
  >
    <span>
      <Icon type="unordered-list" />
      <span style={{ marginLeft: 20 }}>{value}</span>
    </span>
    <Radio value={num}>冻结本列及以前</Radio>
  </li>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul style={{ margin: 0, padding: 0 }}>
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
  const { columns: propsColumns } = props;
  const columns = propsColumns.filter((item) => item.fixed !== 'right');
  const { id, hideColumns, orderMap, columns: cacheColumns, setCacheState, frozenNumber } = useTableContext();
  const [hideIds, setHidesId] = useState(() => [...hideColumns.values()] as string[]);
  const [currFrozenNumber, setCurrFrozenNumber] = useState(frozenNumber);
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
    setRenderColumns(orderedColumns.filter((item: Column) => !hides[item?.key]));
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
          columns: curr,
          frozenNumber: currFrozenNumber
        });
      }
    };
  });

  return (
    <Tabs defaultActiveKey="all">
      <Tabs.TabPane key="all" tab="全部列(勾选隐藏)">
        <Checkbox.Group
          className="checkbox-group"
          value={hideIds}
          onChange={(val: string[]) => {
            setHidesId(val);
          }}
        >
          {columns.map((item) => (
            <div key={item.key} className="select-column-item item">
              <Checkbox value={item.key!} /> {item.title}
            </div>
          ))}
        </Checkbox.Group>
      </Tabs.TabPane>
      <Tabs.TabPane key="sort" tab="排序">
        <Radio.Group
          value={currFrozenNumber}
          onChange={(e) => {
            setCurrFrozenNumber(e.target.value);
          }}
        >
          <div style={{ textAlign: 'right', position: 'absolute', right: 0, marginTop: -50 }}>
            <Radio value={-1}>不冻结</Radio>
          </div>
          <SortableList
            items={renderColumns}
            onSortEnd={({ newIndex, oldIndex }) => {
              const currColumns = [...renderColumns];
              currColumns.splice(newIndex, 0, currColumns.splice(oldIndex, 1)[0]);
              setRenderColumns(currColumns);
            }}
          />
        </Radio.Group>
      </Tabs.TabPane>
    </Tabs>
  );
});

const useSortHideColumn = () => {
  const ref = useRef<{ onOk: () => void }>(null);
  const { cleanCache } = useTableContext();
  const { RenderModal, hide, ...rest } = useModal({
    className: 'site-component-table-modal',
    title: '列排序',
    cancelText: '取消',
    okText: '保存',
    footer: (
      <div className="footer">
        <Button
          type="danger"
          onClick={() => {
            cleanCache();
            hide();
          }}
        >
          重置
        </Button>
        <div>
          <Button
            onClick={() => {
              hide();
            }}
          >
            取消
          </Button>
          <Button
            type="primary"
            onClick={() => {
              ref.current?.onOk();
              hide();
            }}
          >
            保存
          </Button>
        </div>
      </div>
    )
  });
  const RenderSortHideColumn = useImmutable(() => {
    return <RenderModal>{(columns) => <SortAndHideColumn ref={ref} columns={columns} />}</RenderModal>;
  });
  return { RenderSortHideColumn, hide, ...rest };
};
/**
 * 包裹排序弹窗及Context
 */
export const SortTableContainer = ({ children, columns = [] }: { children: React.ReactElement; columns: any[] }) => {
  const { RenderSortHideColumn, show } = useSortHideColumn();
  const ref = useRef(columns);
  ref.current = columns;
  const value = useMemo(() => ({ show: () => show(ref.current) }), [show]);
  return (
    <ModalContext.Provider value={value}>
      <>
        {children}
        <RenderSortHideColumn />
      </>
    </ModalContext.Provider>
  );
};

/**
 * 触发弹窗进行显示或者排序
 */
export const SortTableTrigger = ({ children }: { children: React.ReactElement }) => {
  const { show } = useModalContext();
  return React.cloneElement(children, { onClick: () => show() });
};

export default SortAndHideColumn;
