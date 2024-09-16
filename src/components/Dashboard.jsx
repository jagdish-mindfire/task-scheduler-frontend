import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';

const TasksTable = ({ tasks=[{title:'hii',description:'adsfasdf asdfsad adsfsadfsa asdf',dueDate:"2024-09-20T03:30:33.000+00:00",id:1}], onComplete, onEdit }) => {
  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        Header: 'Task Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ value }) => (
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => onComplete(value)}
            >
              Complete
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => onEdit(value)}
            >
              Edit
            </button>
          </div>
        ),
      },
    ],
    [onComplete, onEdit]
  );

  const data = useMemo(() => tasks, [tasks]);

  // Set up table instance with pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Start on the first page
    },
    usePagination
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Tasks List</h2>
      <table {...getTableProps()} className="min-w-full bg-white border border-gray-300">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100 text-left">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="py-2 px-4 border-b">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-50">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="py-2 px-4 border-b">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <div>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </div>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>

      <div className="mt-2">
        <label>
          Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className="border p-1 rounded"
            style={{ width: '50px' }}
          />
        </label>
      </div>

      <div className="mt-2">
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {[5, 10, 20, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TasksTable;
