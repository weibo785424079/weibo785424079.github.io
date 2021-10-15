import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/es/table';
import { useSortHideColumn } from './SortAndHide';
import ResizeableTitle from './ResizeableTitle';
import { useTableContext } from './context';
import 'antd/es/table/style/index';

const MIN_WIDTH = 100;

const $Table = ({ columns = [], ...rest }: TableProps<any>) => {
  /**
   * 根据id初始化列数据
   * 1，获取缓存数据，
   *    *如果有跟当前列宽度匹配重写宽度，
   *    *列显示隐藏
   *    *冻结列位置
   *    *列排序
   * 2、在onResize阶段重新设置宽度
   * 3、设置列显示、排序、冻结、更新数据
   */
  const {
    id,
    columns: contextCacheColumns,
    frozenNumber,
    setCacheState,
    orderMap,
    hideColumns,
    cacheWidth
  } = useTableContext();

  const components = {
    header: {
      cell: ResizeableTitle
    }
  };

  const { RenderSortHideColumn, show } = useSortHideColumn();

  const columnsWidth = columns.reduce((prev, next) => {
    if (next.key) {
      prev[next.key] = next.width; // eslint-disable-line
    }
    return prev;
  }, {});

  const newColumns = columns
    .filter(({ key }) => !hideColumns.has(String(key!)))
    .sort((a, b) => orderMap.get(String(a.key))! - orderMap.get(String(b.key))!)
    .map((col, index) => {
      const width = cacheWidth.get(String(col.key!)) || columnsWidth[col.key!];
      const fixed = (() => {
        if (col.fixed === 'right') return 'right' as const;
        return frozenNumber === -1 ? false : index < frozenNumber;
      })();
      return {
        ...col,
        fixed,
        width: cacheWidth.get(String(col.key!)),
        onHeaderCell: () => ({
          width,
          onResize(e, { size }) {
            const newCacheColumns = [...contextCacheColumns];
            const currWith = Math.max(MIN_WIDTH, size.width);
            const one = newCacheColumns.find((item) => item.key === col.key);
            if (one) {
              one.width = currWith;
            } else {
              newCacheColumns.push({
                key: col.key as any,
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

  console.log(newColumns, 'columns');
  return (
    <>
      <Table scroll={{ x: 500 }} components={components} columns={newColumns} {...rest} />;
      <button type="button" onClick={() => show(columns)}>
        打开弹窗
      </button>
      <RenderSortHideColumn />
    </>
  );
};

export default $Table;
