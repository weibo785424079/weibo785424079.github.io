/* eslint-disable no-param-reassign */
import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/es/table';
import ResizeableTitle from './ResizeableTitle';
import { SortTableContainer } from './SortModal';
import { useTableContext } from './context';
import 'antd/es/table/style/index';

function InnerTable<T>({ className, columns = [], ...rest }: TableProps<T>) {
  const {
    id,
    columns: contextCacheColumns,
    frozenNumber,
    setCacheState,
    orderMap,
    hideColumns,
    cacheWidth,
    minWidth
  } = useTableContext();

  const components = {
    header: {
      cell: ResizeableTitle
    }
  };

  const columnsWidth = columns.reduce((prev, next) => {
    if (next.key) {
      prev[next.key] = next.width;
    }
    return prev;
  }, {});
  const newColumns = columns
    .filter(({ key }) => !hideColumns.has(String(key!)))
    .sort((a, b) => orderMap.get(String(a.key))! - orderMap.get(String(b.key))!)
    .map((col, index) => {
      const width = cacheWidth.get(String(col.key!)) || columnsWidth[col.key!];
      const fixed = col.fixed === 'right' ? ('right' as const) : index <= frozenNumber;
      return {
        ...col,
        fixed,
        width: cacheWidth.get(String(col.key!)),
        onHeaderCell: () => ({
          width,
          hide: col.fixed === 'right',
          onResize(_e, { size }) {
            const newCacheColumns = [...contextCacheColumns];
            const currWith = Math.max(minWidth || -Infinity, size.width);
            const one = newCacheColumns.find((item) => item.key === col.key);
            if (one) {
              one.width = currWith;
            } else {
              newCacheColumns.push({
                key: col.key as string,
                show: 1,
                order: NaN,
                width: currWith
              });
            }
            setCacheState({
              id,
              columns: newCacheColumns
            });
          }
        })
      };
    });
  return (
    <Table
      components={components}
      columns={newColumns}
      {...rest}
      className={`${className || ''} site-component-table`}
    />
  );
}

function SortTableContainerWrap<T = any>(props: TableProps<T>) {
  const { columns = [] } = props;
  return (
    <SortTableContainer columns={columns}>
      <InnerTable<T> {...props} />
    </SortTableContainer>
  );
}

export default SortTableContainerWrap;
