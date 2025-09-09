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

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    loading = false,
    selectable = false,
    onRowSelect,
}: DataTableProps<T>) {
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T;
        direction: "asc" | "desc";
    } | null>(null);

    const [selected, setSelected] = useState<Set<string | number>>(new Set());

    // Sorting
    const sortedData = React.useMemo(() => {
        if (!sortConfig) return data;
        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    const handleSort = (key: keyof T) => {
        setSortConfig((prev) => {
            if (prev && prev.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    const toggleRow = (id: string | number) => {
        const newSelected = new Set(selected);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelected(newSelected);
        if (onRowSelect) {
            const selectedRows = data.filter((row) => newSelected.has(row.id));
            onRowSelect(selectedRows);
        }
    };

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (data.length === 0) {
        return <div className="p-4 text-center text-gray-500">No data available</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        {selectable && <th className="p-2 border">Select</th>}
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="p-2 border cursor-pointer select-none"
                                onClick={() => col.sortable && handleSort(col.dataIndex)}
                            >
                                {col.title}
                                {col.sortable && sortConfig?.key === col.dataIndex && (
                                    <span>{sortConfig.direction === "asc" ? " 🔼" : " 🔽"}</span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {selectable && (
                                <td className="p-2 border text-center">
                                    <input
                                        type="checkbox"
                                        checked={selected.has(row.id)}
                                        onChange={() => toggleRow(row.id)}
                                    />
                                </td>
                            )}
                            {columns.map((col) => (
                                <td key={col.key} className="p-2 border">
                                    {String(row[col.dataIndex])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
