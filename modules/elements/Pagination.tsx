import React, { useState, FC } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  currentPage?: number; // Optional prop for initial page
}

const Pagination: FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage = 1,
}) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage);

  const handlePageChange = (pageNumber: number) => {
    setInternalCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const pageNumbers: number[] = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex justify-center items-center">
      {pageNumbers.map((pageNumber) => (
        <li key={pageNumber} className='mx-1'>
          <button 
          className={`px-3 py-1 border border-gray-300 ${(pageNumber === internalCurrentPage) && 'bg-blue-700/80'}`}          
          onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
