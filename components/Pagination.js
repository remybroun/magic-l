import React, { useState, useEffect } from 'react';
import Link from '@/components/Link'
import { useRouter } from 'next/router';

export default function Pagination(props) {

  const router = useRouter()
  const prevPage = parseInt(props.pagination.currentPage) - 1 > 0
  const nextPage = parseInt(props.pagination.currentPage) + 1 <= parseInt(props.pagination.totalPages)


  function changePage(page) {
    console.log(page)
    router.query.page = page
    router.push(router)
  }

  const removeParams = (param) => {
    const params = new URLSearchParams(router.query);
    params.delete(param);
    router.replace({ pathname:router.pathname, query: params.toString() }, undefined, { shallow: true });
  };

  return <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 w-full"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(props.pagination.currentPage - 1)*5 + 1}</span> to <span className="font-medium">{(props.pagination.currentPage * 5 <= props.pagination.count) ? props.pagination.currentPage * 5 : props.pagination.count}</span> of{' '}
          <span className="font-medium">{props.pagination.count}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">

        {!prevPage && (
          <button 
            className="bg-gray-100 text-gray-400 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
            rel="previous" disabled={!prevPage}>
            Previous
          </button>
        )}

        {prevPage && (
          <button 
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => {props.pagination.currentPage - 1 === 1 ? removeParams("page") : changePage(parseInt(props.pagination.currentPage) - 1)}}>
            Previous
          </button>
        )}

        {!nextPage && (
          <button 
            className="bg-gray-100 text-gray-400 relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
            rel="next" disabled={!nextPage}>
            Next
          </button>
        )}

        {nextPage && (
          <button 
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={()=>changePage(parseInt(props.pagination.currentPage) + 1)}>
            Next
          </button>
        )}

      </div>
    </nav>

}
