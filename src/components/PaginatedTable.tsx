import { useState } from "react";

interface PaginatedTableProps {
  data: Array<Array<any>>;
  columns: any[];
  pageSize: number;
  callBack: (skip: number, pageSize: number) => void;
  total: number;
}

export const PaginatedTable = ({
  data,
  columns,
  pageSize = 10,
  callBack,
  total,
}: PaginatedTableProps) => {
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const pages = Math.ceil(total / pageSize);

  const handleLoadMore = async () => {
    const skipEntries = skip + pageSize;
    callBack(skipEntries, pageSize);
    setSkip(skipEntries);
    setPage(page + 1);
  };

  const handleLoadPage = async (page: number) => {
    if (page < 1 || page > pages) {
      return;
    }
    const skipEntries = (page - 1) * pageSize;
    callBack(skipEntries, pageSize);
    setSkip(skipEntries);
    setPage(page);
  };

  const startIndex = () => page * pageSize;
  const endIndex = () => (page + 1) * pageSize;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column, index) => (
              <th scope="col" key={index} className="px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(startIndex(), endIndex()).map((rowData, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {rowData.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1000
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handleLoadPage(page - 1)}
            >
              Previous
            </a>
          </li>
          {Array.from({ length: pages }, (_, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={() => handleLoadPage(index + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  index + 1 === page ? "bg-blue-500 text-white" : ""
                }`}
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handleLoadPage(page + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
