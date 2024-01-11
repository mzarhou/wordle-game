import { cn } from "~/lib/utils";

interface Props {
  text: string;
  className?: string;
}
export default function FullPlaceHolder(props: Props) {
  return (
    <div
      className={cn(
        "flexy text-foreground items-center justify-center text-lg",
        props.className,
      )}
    >
      {props.text}
    </div>
  );
}
