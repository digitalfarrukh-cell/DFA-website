"use client";

type Props = {
  className?: string;
  children: React.ReactNode;
};

// Opens the free-class registration modal.
export default function FreeClassButton({ className, children }: Props) {
  const open = () => window.dispatchEvent(new CustomEvent("dfa-freeclass"));
  return (
    <button onClick={open} className={className}>
      {children}
    </button>
  );
}
