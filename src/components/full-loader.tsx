import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

interface Props {
  className?: string;
  iconClassName?: string;
}
export default function FullLoader({ className, iconClassName }: Props) {
  return (
    <div className={cn("flexy items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin", iconClassName)} />
    </div>
  );
}
