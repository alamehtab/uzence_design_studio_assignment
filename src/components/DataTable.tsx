import React, { useState } from "react";
export interface Column<T> {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    selectable?: boolean;
    onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends Record<string, any>>({
    data,
    columns,
    loading = false,
    selectable = false,
    onRowSelect,
}: DataTableProps<T>) {
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

    const handleSort = (col: Column<T>) => {
        if (!col.sortable) return;
        let direction: "asc" | "desc" = "asc";
        if (sortConfig?.key === col.dataIndex && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key: col.dataIndex, direction });
    };

    const sortedData = sortConfig
        ? [...data].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        })
        : data;

    const toggleRow = (row: T) => {
        let newSelected: T[];
        if (selectedRows.includes(row)) {
            newSelected = selectedRows.filter((r) => r !== row);
        } else {
            newSelected = [...selectedRows, row];
        }
        setSelectedRows(newSelected);
        onRowSelect?.(newSelected);
    };

    return (
        <div className="overflow-x-auto">
            {loading ? (
                <p className="text-center py-4">Loading...</p>
            ) : sortedData.length === 0 ? (
                <p className="text-center py-4">No data available</p>
            ) : (
                <table className="min-w-full border border-gray-300 dark:border-gray-600">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            {selectable && <th className="p-2"></th>}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    onClick={() => handleSort(col)}
                                    className={`p-2 text-left cursor-${col.sortable ? "pointer" : "default"} text-gray-700 dark:text-gray-200`}
                                >
                                    {col.title}
                                    {sortConfig?.key === col.dataIndex && (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, i) => (
                            <tr key={i} className="border-t border-gray-300 dark:border-gray-600">
                                {selectable && (
                                    <td className="p-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(row)}
                                            onChange={() => toggleRow(row)}
                                        />
                                    </td>
                                )}
                                {columns.map((col) => (
                                    <td key={col.key} className="p-2 text-gray-800 dark:text-gray-100">
                                        {String(row[col.dataIndex])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
