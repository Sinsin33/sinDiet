function Pagination({ currentPage, totalPages, onPageChange }) {
  // Create an array like [1, 2, 3, ... totalPages]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-emerald-600 text-white disabled:opacity-50 hover:bg-emerald-700 transition"
      >
        قبلی
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md transition ${
            page === currentPage
              ? "bg-emerald-700 text-white"
              : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-emerald-600 text-white disabled:opacity-50 hover:bg-emerald-700 transition"
      >
        بعدی
      </button>
    </div>
  );
}

export default Pagination;
