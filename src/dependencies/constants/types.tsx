export type Item = {
  const: string;
  count: number;
  created: string;
  desc: string;
  icon: string;
  id: string;
  maxPrice: string;
  minPrice: string;
  updatedAt: string;
};

export type ItemShort = {
  id: string;
  desc: string;
  icon: string;
  status: string;
};

export type PaginationParams = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: string[];
};

export type FilterItems = {
  name: string;
  clickHandler: () => void;
  type: string;
};
