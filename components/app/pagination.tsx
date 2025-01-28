import { Table } from '@tanstack/react-table'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

type PaginationProps<T> = {
    table: Table<T>
}

export function AppPagination<T>({ table }: PaginationProps<T>) {
    const currentPage = table.getState().pagination.pageIndex
    const totalPages = table.getPageCount()

    return (
        <Pagination>
            <PaginationContent>
                {table.getCanPreviousPage() && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => table.previousPage()}
                        />
                    </PaginationItem>
                )}

                {currentPage > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => table.setPageIndex(0)}
                            >
                                {1}
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage > 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </>
                )}

                {Array.from(
                    { length: Math.min(3, totalPages) },
                    (_, i) => currentPage - 1 + i
                )
                    .filter((page) => page >= 0 && page < totalPages)
                    .map((page, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                key={page}
                                isActive={currentPage === page}
                                onClick={() => table.setPageIndex(page)}
                            >
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                {currentPage < totalPages - 2 && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink>{totalPages}</PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {table.getCanNextPage() && (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => table.nextPage()}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}
