"use client"
import {
    Column,
    ColumnDef,
    ColumnFiltersState,
    RowData,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
 export default function Filter({ column }: { column: Column<any, unknown> }) {
    const columnFilterValue = column.getFilterValue()
    const { filterVariant } = column.columnDef.meta as any ?? {}
  
    return filterVariant === 'range' ? (
      <div>
        <div className="flex space-x-2">
          {/* See faceted column filters example for min max values functionality */}
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={value =>
              column.setFilterValue((old: [number, number]) => [value, old?.[1]])
            }
            placeholder={`Min`}
            className="w-24 border shadow rounded"
          />
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={value =>
              column.setFilterValue((old: [number, number]) => [old?.[0], value])
            }
            placeholder={`Max`}
            className="w-24 border shadow rounded"
          />
        </div>
        <div className="h-1" />
      </div>
    ) : filterVariant === 'select' ? (
      <select
        onChange={e => column.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString()}
      >
        {/* See faceted column filters example for dynamic select options */}
        <option value="">All</option>
        <option value="open">open</option>
        <option value="closed">closed</option>
        <option value="completed">completed</option>
        <option value="pending">pending</option>
        <option value="rejected">rejected</option>

      </select>
    ) : (
      <DebouncedInput
        className="w-36 border shadow rounded"
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search...`}
        type="text"
        value={(columnFilterValue ?? '') as string}
      />
      // See faceted column filters example for datalist search suggestions
    )
  }
  
  // A typical debounced input react component
  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = useState(initialValue)
  
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)
  
      return () => clearTimeout(timeout)
    }, [value])
  
    return (
      <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
  }