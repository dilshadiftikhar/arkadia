import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OpenTableBadgeProps {
  current: number;
  max: number;
  className?: string;
}

export function OpenTableBadge({ current, max, className }: OpenTableBadgeProps) {
  const available = max - current;
  const ratio = current / max;

  if (available === 0) {
    return (
      <Badge variant="destructive" className={className}>
        Complet
      </Badge>
    );
  }

  return (
    <Badge
      variant="secondary"
      className={cn(
        ratio >= 0.8 ? "bg-amber-900/40 text-amber-200 border-amber-700" : "",
        "tabular-nums",
        className
      )}
    >
      {available} place{available > 1 ? "s" : ""} dispo
    </Badge>
  );
}
