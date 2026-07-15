import { Button } from "@mui/material";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
};

export function Pagination(props: Readonly<PaginationProps>) {
  const { page, totalPages, onPageChange } = props;
  const maxVisible = 5; // number of middle pages (excluding first/last and ellipsis)
  const pages: (number | "ellipsis")[] = [];

  if (totalPages <= 1) return null;

  pages.push(0); // first page

  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages - 2, start + maxVisible - 1);

  // shift window, if we are at the end
  start = Math.max(1, end - maxVisible + 1);

  // left ellipse
  if (start > 1) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  // right ellipse
  if (end < totalPages - 2) pages.push("ellipsis");

  pages.push(totalPages - 1); // last page

  const handlePrev = () => {
    scrollTo({ top: 0, behavior: "smooth" });
    if (page > 0) onPageChange?.(page - 1);
  };

  const handleNext = () => {
    scrollTo({ top: 0, behavior: "smooth" });
    if (page + 1 < totalPages) onPageChange?.(page + 1);
  };

  return (
    <div className="flex items-center gap-2 my-4">
      <Button onClick={handlePrev} disabled={page === 0}>
        Prev
      </Button>

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`pagination-ellipsis-${i}`} className="px-2">
            …
          </span>
        ) : (
          <Button
            variant="neutral"
            key={`page-${p}`}
            onClick={() => onPageChange?.(p)}
          >
            {String(p + 1).padStart(2, "0")}
          </Button>
        ),
      )}

      <Button onClick={handleNext} disabled={page + 1 >= totalPages}>
        Next
      </Button>
    </div>
  );
}
