export default {
  table: {
    tableClass: "tbl table-bordered table-hover ",
    loadingClass: "loading",
    ascendingIcon: "fa-solid fa-sort-up",
    descendingIcon: "fa-solid fa-sort-down",
    ascendingClass: "sorted-asc",
    descendingClass: "sorted-desc",
    sortableIcon: "fa fa-sort",
    detailRowClass: "",
    handleIcon: "fa fa-bars text-secondary",
    renderIcon(classes, options) {
      return `<i class="${classes.join(" ")}" ${options}></span>`;
    },
  },
  pagination: {
    infoClass: "pagination pull-right",
    wrapperClass: "pull-right",
    activeClass: "active",
    disabledClass: "disabled",
    pageClass: "btn",
    linkClass: " p-2 m-1 ",
    icons: {
      first: "fa-solid fa-angles-left",
      prev: "fa-solid fa-angle-left",
      next: "fa-solid fa-angle-right ",
      last: "fa-solid fa-angles-right",
    },
  },
};
