
import React, { useState } from "react";

interface CategoryArticleSearchProps {
  onSearch: (search: string) => void;
  onSort: (sortBy: string) => void;
  sortBy: string;
  search: string;
}

const SORT_OPTIONS = [
  { value: "date_desc", label: "Neueste zuerst" },
  { value: "date_asc", label: "Älteste zuerst" },
  { value: "read_time_asc", label: "Kürzeste Lesezeit" },
  { value: "read_time_desc", label: "Längste Lesezeit" },
];

const CategoryArticleSearch: React.FC<CategoryArticleSearchProps> = ({
  onSearch,
  onSort,
  sortBy,
  search,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
      <input
        type="text"
        className="border rounded-md px-4 py-2 w-full max-w-xs"
        placeholder="Artikel suchen..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        className="border rounded-md px-4 py-2 w-full max-w-xs"
        value={sortBy}
        onChange={(e) => onSort(e.target.value)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryArticleSearch;
