import { ChevronLeft, ChevronRight } from "lucide-react";

const getPageNumbers = (currentPage, totalPages) => {
  const pages = [];

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);

  if (currentPage > 3) pages.push("...");

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) pages.push("...");

  pages.push(totalPages);

  return pages;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrev,
  onNext,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-1 text-sm">
      {/* Prev */}
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-3 py-2 mr-3 text-gray-800 border rounded-md hover:text-[#2692d1] disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        « Prev
      </button>

      {/* Page Numbers */}
      {getPageNumbers(currentPage, totalPages).map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-2 text-gray-400 select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-md transition-colors
              ${
                currentPage === page
                  ? "bg-[#2692d1] text-white border border-[#2692d1] font-semibold"
                  : "text-gray-700 border border-[#2692d1] hover:text-[#2692d1]"
              }
            `}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-3 ml-3 py-2 text-gray-800 border rounded-md hover:text-[#2692d1] disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;
    