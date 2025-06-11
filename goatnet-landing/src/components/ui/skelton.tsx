export default function Skeleton({ height = "h-48" }) {
  return (
    <div className={`${height} w-full animate-pulse bg-gray-800 rounded-xl`} />
  );
}
