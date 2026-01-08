import { CircleAlert } from "lucide-react";

interface ErrorMessageProps {
  message?: string;
  className?: string;
  id?: string;
}

const ErrorMessage = ({ message, className = "", id }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      aria-live="polite"
      className={`mt-2.5 text-sm text-[#D80000] flex items-center gap-1 ${className}`}
    >
      <CircleAlert size={16} className="shrink-0 text-[#D80000]" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
};

export default ErrorMessage;
