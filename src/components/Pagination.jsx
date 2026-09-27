

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) {
        return null;
    }
    const buttonClass = 
    'rounded-lg border-slate-300 bg-white px-4 py-2' + 'font-semibold hover:bg-slate-100' + 'disabled:cursor-not-allowed disabled:opacity-40';
  return (
    <nav aria-label="Post pagination" className="mt-8 flex flex-wrap items-center justify-center gap-4">
      <button
      type="button"
      className={buttonClass}
      disabled={currentPage === 1}
      onClick={()=> onPageChange(currentPage -1)}>Previous</button>
      <span role="status" className="text-sm text-slate-600">Page {currentPage} of {totalPages}</span>
      <button 
        type="button"
        className={buttonClass}
        disabled={currentPage === totalPages}
        onClick={()=> onPageChange(currentPage + 1)}>Next</button>
    </nav>
  );
}

export default Pagination;