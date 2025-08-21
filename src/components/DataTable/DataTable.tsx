import { useMemo, useState } from "react";
import clsx from "clsx";
import type { DataTableProps, SortOrder } from "./types";



export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
    () => new Set()
  );

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return data;
    const arr = [...data];
    arr.sort((a, b) => {
      const va = a[col.dataIndex];
      const vb = b[col.dataIndex];
      if (va === vb) return 0;
      // Basic string/number compare
      if (va < vb) return sortOrder === "asc" ? -1 : 1;
      return sortOrder === "asc" ? 1 : -1;
    });
    return arr;
  }, [data, columns, sortKey, sortOrder]);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const toggleRow = (id: string | number) => {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedIds(next);
    if (onRowSelect) {
      const selectedRows = data.filter((r) => next.has(r.id));
      onRowSelect(selectedRows);
    }
  };

  const allSelected = data.length > 0 && selectedIds.size === data.length;
  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
      onRowSelect?.([]);
    } else {
      const ids = new Set(data.map((d) => d.id));
      setSelectedIds(ids);
      onRowSelect?.(data);
    }
  };

  return (
    <div className={clsx("w-full overflow-x-auto", className)}>
      <table
        className="min-w-[600px] w-full table-auto border-collapse"
        aria-busy={loading || undefined}
      >
        <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800">
          <tr className="text-left text-sm text-gray-600 dark:text-gray-300">
            {selectable && (
              <th className="p-3 border-b border-gray-200 dark:border-gray-700 w-10">
                <input
                  type="checkbox"
                  aria-label={allSelected ? "Deselect all rows" : "Select all rows"}
                  checked={allSelected}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((c) => {
              const isSorted = sortKey === c.key;
              const ariaSort = isSorted ? (sortOrder === "asc" ? "ascending" : "descending") : "none";
              return (
                <th
                  key={c.key}
                  scope="col"
                  className={clsx(
                    "p-3 border-b border-gray-200 dark:border-gray-700 font-semibold select-none",
                    c.sortable && "cursor-pointer"
                  )}
                  onClick={() => c.sortable && toggleSort(c.key)}
                  aria-sort={ariaSort as any}
                >
                  <span className="inline-flex items-center gap-1">
                    {c.title}
                    {c.sortable && (
                      <span aria-hidden>
                        {isSorted ? (sortOrder === "asc" ? "▲" : "▼") : "↕"}
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="text-sm">
          {loading ? (
            <tr>
              <td
                className="p-6 text-center text-gray-500"
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                Loading…
              </td>
            </tr>
          ) : sorted.length === 0 ? (
            <tr>
              <td
                className="p-6 text-center text-gray-500"
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                No data available
              </td>
            </tr>
          ) : (
            sorted.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                {selectable && (
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${row.id}`}
                      checked={selectedIds.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>
                )}
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className="p-3 border-b border-gray-200 dark:border-gray-700"
                  >
                    {c.render
                      ? c.render(row[c.dataIndex], row)
                      : String(row[c.dataIndex] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
