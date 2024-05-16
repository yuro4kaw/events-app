"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  itemsPerPage: number;
  totalItems: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  itemsPerPage,
  totalItems,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");


  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex gap-2">
      <button
        className="bg-blue-500 text-white p-1 disabled:bg-blue-200"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${page - 1}`);
        }}
      >
        prev page
      </button>

      <div className="text-red-500">
        {page} / {totalPages}
      </div>

      <button
        className="bg-blue-500 text-white p-1 disabled:bg-blue-200"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${page + 1}`);
        }}
      >
        next page
      </button>
    </div>
  );
};

export default PaginationControls;
