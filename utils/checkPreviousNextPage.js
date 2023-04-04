const checkPreviousNextPage = (count, itemsPerPage, currentPage) => {
  const totalPages = Math.ceil(count / itemsPerPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return { hasPreviousPage, hasNextPage };
};

module.exports = checkPreviousNextPage;
