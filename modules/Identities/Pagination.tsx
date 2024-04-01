import React from 'react';
type Props = {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}
const Pagination = ({totalPages, currentPage, setCurrentPage}:Props) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    return (
        <ul className='flex justify-center items-center'>
            {pageNumbers.map(number => (
                <li key={number} className='mx-1'>
                    <button onClick={() => setCurrentPage(number)} className={`px-3 py-1 border border-gray-300 ${currentPage === number ? 'bg-blue-700/80' : ''}`}>{number}</button>
                </li>
            ))}
        </ul>
    );
}
export default Pagination;