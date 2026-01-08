import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  currentPage,
}) => {
  const baseButtonClass = "flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-base font-normal cursor-pointer transition-all duration-200 border-none outline-none hover:bg-[#2F80ED] hover:text-white";
  const disabledClass = "opacity-50 cursor-not-allowed pointer-events-none";
  const baseLinkClass = "flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-base font-normal cursor-pointer transition-all duration-200 no-underline border-none outline-none hover:bg-[#2F80ED] hover:text-white";

  return (
    <div className="flex justify-center items-center p-6 gap-2 bg-white" role="navigation" aria-label="Pagination">
      <button
        onClick={() => onPageChange({ selected: 0 })}
        disabled={currentPage === 0}
        className={`${baseButtonClass} ${currentPage === 0 ? disabledClass : ""} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        aria-label="Go to first page"
        aria-disabled={currentPage === 0}
      >
        <ChevronsLeft size={16} className="shrink-0" aria-hidden="true" />
        <span className="sr-only">First page</span>
      </button>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={onPageChange}
        forcePage={currentPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        previousLabel={<><ChevronLeft size={16} className="shrink-0" aria-hidden="true" /><span className="sr-only">Previous page</span></>}
        nextLabel={<><ChevronRight size={16} className="shrink-0" aria-hidden="true" /><span className="sr-only">Next page</span></>}
        breakLabel={<span aria-hidden="true">...</span>}
        containerClassName="flex justify-center items-center gap-2 list-none p-0 m-0"
        pageLinkClassName={`${baseLinkClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        previousLinkClassName={`${baseLinkClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        nextLinkClassName={`${baseLinkClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        breakLinkClassName="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-base font-normal cursor-default transition-all duration-200 no-underline border-none outline-none"
        activeLinkClassName="flex items-center justify-center w-8 h-8 rounded-full !bg-[#2F80ED] text-white text-base font-medium cursor-pointer transition-all duration-200 no-underline border-none outline-none hover:!bg-[#2F80ED] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabledLinkClassName={`${baseLinkClass} ${disabledClass}`}
      />
      <button
        onClick={() => onPageChange({ selected: pageCount - 1 })}
        disabled={currentPage === pageCount - 1}
        className={`${baseButtonClass} ${currentPage === pageCount - 1 ? disabledClass : ""} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        aria-label="Go to last page"
        aria-disabled={currentPage === pageCount - 1}
      >
        <ChevronsRight size={16} className="shrink-0" aria-hidden="true" />
        <span className="sr-only">Last page</span>
      </button>
    </div>
  );
};

export default Pagination;

