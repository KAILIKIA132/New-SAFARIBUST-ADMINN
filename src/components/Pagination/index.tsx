import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { totalPages, currentPage, onChange } = props;

  const handlePageChange = (page: number) => {
    onChange(page);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`px-4 py-2 text-sm font-medium ${
              currentPage === page
                ? "text-indigo-600 bg-indigo-100"
                : "text-gray-700 bg-white"
            } border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export { Pagination as default };
