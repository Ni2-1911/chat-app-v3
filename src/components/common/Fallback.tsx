export default function Fallback({ fallBackText }: { fallBackText: string }) {
  return (
    <div className="flex-center text-wt-300 text-800 h-100">{fallBackText}</div>
  );
}
