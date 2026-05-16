"use client"

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
    SortingState,
} from "@tanstack/react-table"
import { useState } from "react"
import Image from "next/image"
import { Product } from "@/src/schemas"

const columnHelper = createColumnHelper<Product>()

const columns = [
    columnHelper.accessor("image", {
        header: "Imagen",
        enableSorting: false,
        enableColumnFilter: false,
        cell: (info) => (
            <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/img/${info.getValue()}`}
                alt="producto"
                width={48}
                height={48}
                className="rounded object-cover"
            />
        ),
    }),
    columnHelper.accessor("id", {
        header: "ID",
        size: 60,
    }),
    columnHelper.accessor("name", {
        header: "Nombre",
    }),
    columnHelper.accessor("price", {
        header: "Precio",
        cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor("inventory", {
        header: "Inventario",
    }),
    columnHelper.accessor("categoryId", {
        header: "Categoría",
    }),
]

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

export default function ProductsTable({ products }: { products: Product[] }) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState("")

    const table = useReactTable({
        data: products,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    })

    const { pageIndex, pageSize } = table.getState().pagination
    const totalPages = table.getPageCount()
    const filteredCount = table.getFilteredRowModel().rows.length
    const from = filteredCount === 0 ? 0 : pageIndex * pageSize + 1
    const to = Math.min((pageIndex + 1) * pageSize, filteredCount)

    return (
        <div className="mt-6 space-y-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3">
                <input
                    type="text"
                    value={globalFilter}
                    onChange={(e) => {
                        setGlobalFilter(e.target.value)
                        table.setPageIndex(0)
                    }}
                    placeholder="Buscar producto..."
                    className="border border-black/10 rounded px-3 py-1.5 text-sm w-64 focus:outline-none focus:border-black/30"
                />
                <div className="flex items-center gap-2 text-xs text-ash">
                    <span>Filas por página</span>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value))
                            table.setPageIndex(0)
                        }}
                        className="border border-black/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-black/30"
                    >
                        {PAGE_SIZE_OPTIONS.map((size) => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b border-black/8">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className={`px-3 py-2 text-left text-[10px] tracking-[0.15em] uppercase text-ash font-medium select-none ${header.column.getCanSort() ? "cursor-pointer" : ""}`}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() === "asc" && " ↑"}
                                        {header.column.getIsSorted() === "desc" && " ↓"}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b border-black/5 hover:bg-black/2 transition-colors"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-3 py-2 text-ink tabular-nums">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredCount === 0 && (
                    <p className="text-sm text-ash text-center py-8">
                        {globalFilter ? "Sin resultados para la búsqueda" : "No hay productos"}
                    </p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <span className="text-xs text-ash">
                        {from}–{to} de {filteredCount}
                        {globalFilter && ` (filtrado de ${products.length})`}
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-2.5 py-1 rounded border border-black/10 text-xs disabled:opacity-30 hover:bg-black/5 transition-colors"
                        >
                            ←
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => table.setPageIndex(i)}
                                className={`px-2.5 py-1 rounded border text-xs transition-colors ${
                                    pageIndex === i
                                        ? "border-black bg-black text-white"
                                        : "border-black/10 hover:bg-black/5"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="px-2.5 py-1 rounded border border-black/10 text-xs disabled:opacity-30 hover:bg-black/5 transition-colors"
                        >
                            →
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
