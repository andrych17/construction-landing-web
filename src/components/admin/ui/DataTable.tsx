'use client';

import React, { useState, useMemo } from 'react';
import {
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
  LuArrowUpDown,
  LuArrowUp,
  LuArrowDown,
  LuFilter,
  LuX,
} from 'react-icons/lu';

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDef<T> {
  key: keyof T | string;
  label: string;
  options: FilterOption[];
  filterFn?: (row: T, value: string) => boolean;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  filters?: FilterDef<T>[];
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  actions?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (row: T) => void;
  selectedIds?: string[];
  onSelectIds?: (ids: string[]) => void;
  getItemId?: (row: T) => string;
}

export function DataTable<T>({
  columns,
  data,
  searchPlaceholder = 'Cari data…',
  searchKeys = [],
  filters = [],
  pageSizeOptions = [10, 25, 50],
  defaultPageSize = 10,
  actions,
  emptyTitle = 'Tidak ada data',
  emptyDescription = 'Belum ada data yang sesuai dengan pencarian atau filter.',
  onRowClick,
  selectedIds,
  onSelectIds,
  getItemId,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: 'asc' | 'desc' | null }>({
    key: null,
    direction: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // 1. Filtered Data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = searchKeys.length > 0
          ? searchKeys.some((k) => {
              const val = item[k];
              return val !== undefined && val !== null && String(val).toLowerCase().includes(query);
            })
          : Object.values(item as Record<string, unknown>).some((val) =>
              val !== undefined && val !== null && String(val).toLowerCase().includes(query)
            );
        if (!matchesSearch) return false;
      }

      // Dropdown filters
      for (const filter of filters) {
        const selectedValue = activeFilters[filter.key as string];
        if (selectedValue && selectedValue !== 'ALL') {
          if (filter.filterFn) {
            if (!filter.filterFn(item, selectedValue)) return false;
          } else {
            const itemVal = String((item as Record<string, unknown>)[filter.key as string]);
            if (itemVal !== selectedValue) return false;
          }
        }
      }

      return true;
    });
  }, [data, searchQuery, searchKeys, filters, activeFilters]);

  // 2. Sorted Data
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === 'asc'
          ? aVal.localeCompare(bVal, undefined, { numeric: true })
          : bVal.localeCompare(aVal, undefined, { numeric: true });
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // 3. Paginated Data
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key?: keyof T) => {
    if (!key) return;
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: null, direction: null };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectIds || !getItemId) return;
    if (checked) {
      const allIds = paginatedData.map(getItemId);
      onSelectIds(Array.from(new Set([...(selectedIds || []), ...allIds])));
    } else {
      const pageIds = new Set(paginatedData.map(getItemId));
      onSelectIds((selectedIds || []).filter((id) => !pageIds.has(id)));
    }
  };

  const isAllSelected = useMemo(() => {
    if (!selectedIds || !getItemId || paginatedData.length === 0) return false;
    return paginatedData.every((item) => selectedIds.includes(getItemId(item)));
  }, [selectedIds, getItemId, paginatedData]);

  return (
    <div className="space-y-4">
      {/* Top Toolbar: Search, Filters, Page Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          {/* Instant Search Box */}
          <div className="relative flex-1 sm:max-w-xs min-w-[200px]">
            <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-8 py-2 min-h-[40px] text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-lg outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer"
              >
                <LuX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          {filters.map((filter) => (
            <div key={filter.key as string} className="relative flex items-center">
              <select
                value={activeFilters[filter.key as string] || 'ALL'}
                onChange={(e) => {
                  setActiveFilters((prev) => ({ ...prev, [filter.key as string]: e.target.value }));
                  setCurrentPage(1);
                }}
                aria-label={filter.label}
                className="pl-3 pr-8 py-2 min-h-[40px] text-xs font-medium bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 cursor-pointer appearance-none"
              >
                <option value="ALL">{filter.label}: Semua</option>
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <LuFilter className="absolute right-2.5 pointer-events-none w-3.5 h-3.5 text-slate-400" />
            </div>
          ))}

          {/* Reset Filters button if any active */}
          {(searchQuery || Object.values(activeFilters).some((v) => v !== 'ALL')) && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilters({});
                setCurrentPage(1);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-amber-600 px-2 py-1.5 rounded transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* Action Buttons (e.g. + Tambah) */}
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-wider font-mono">
                {onSelectIds && getItemId && (
                  <th className="w-10 px-4 py-3.5 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      aria-label="Pilih semua baris"
                      className="rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer w-4 h-4"
                    />
                  </th>
                )}
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    onClick={() => col.sortable && handleSort(col.accessorKey)}
                    className={`px-4 py-3.5 ${
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                    } ${col.sortable ? 'cursor-pointer select-none hover:bg-slate-100 transition-colors' : ''} ${
                      col.className || ''
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 ${
                        col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-slate-400">
                          {sortConfig.key === col.accessorKey ? (
                            sortConfig.direction === 'asc' ? (
                              <LuArrowUp className="w-3.5 h-3.5 text-amber-600" />
                            ) : (
                              <LuArrowDown className="w-3.5 h-3.5 text-amber-600" />
                            )
                          ) : (
                            <LuArrowUpDown className="w-3 h-3 opacity-60" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIdx) => {
                  const id = getItemId ? getItemId(row) : String(rowIdx);
                  const isSelected = selectedIds ? selectedIds.includes(id) : false;

                  return (
                    <tr
                      key={id}
                      onClick={() => onRowClick && onRowClick(row)}
                      className={`hover:bg-amber-50/40 transition-colors group ${
                        isSelected ? 'bg-amber-50/70' : rowIdx % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'
                      } ${onRowClick ? 'cursor-pointer' : ''}`}
                    >
                      {onSelectIds && getItemId && (
                        <td className="w-10 px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                onSelectIds([...(selectedIds || []), id]);
                              } else {
                                onSelectIds((selectedIds || []).filter((item) => item !== id));
                              }
                            }}
                            aria-label={`Pilih baris ${id}`}
                            className="rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer w-4 h-4"
                          />
                        </td>
                      )}
                      {columns.map((col, colIdx) => (
                        <td
                          key={colIdx}
                          className={`px-4 py-3.5 align-middle ${
                            col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                          } ${col.className || ''}`}
                        >
                          {col.cell
                            ? col.cell(row, (currentPage - 1) * pageSize + rowIdx)
                            : col.accessorKey
                            ? String(row[col.accessorKey] ?? '-')
                            : '-'}
                        </td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length + (onSelectIds ? 1 : 0)} className="py-12 text-center">
                    <div className="max-w-sm mx-auto flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                        <LuSearch className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-slate-800">{emptyTitle}</p>
                      <p className="text-xs text-slate-400 mt-1">{emptyDescription}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3.5 bg-slate-50/60 border-t border-slate-200 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span>Tampilkan</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              aria-label="Jumlah baris per halaman"
              className="px-2 py-1 bg-white border border-slate-200 rounded font-semibold text-slate-700 outline-none focus:border-amber-400"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span>baris per halaman</span>
            <span className="text-slate-300 mx-1">|</span>
            <span>
              Menampilkan{' '}
              <strong className="text-slate-800">
                {sortedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
              </strong>{' '}
              –{' '}
              <strong className="text-slate-800">
                {Math.min(currentPage * pageSize, sortedData.length)}
              </strong>{' '}
              dari <strong className="text-slate-800">{sortedData.length}</strong> total data
            </span>
          </div>

          {/* Pagination Navigation Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              title="Halaman Pertama"
            >
              <LuChevronsLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              title="Sebelumnya"
            >
              <LuChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 font-mono text-xs font-bold text-slate-700">
              Halaman {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              title="Berikutnya"
            >
              <LuChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              title="Halaman Terakhir"
            >
              <LuChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
