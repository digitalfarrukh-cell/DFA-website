"use client";

type Props = {
  plan?: string;
  className?: string;
  children: React.ReactNode;
};

// Opens the global enrollment (payment details) modal.
export default function EnrollButton({ plan, className, children }: Props) {
  const open = () => {
    window.dispatchEvent(new CustomEvent("dfa-enroll", { detail: { plan } }));
  };
  return (
    <button onClick={open} className={className}>
      {children}
    </button>
  );
}
