export default function StarRating({
  value,
  size = 16,
}: {
  value: number;
  size?: number;
}) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${value} نجوم`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < value ? "#e9c46a" : "#e2e8f0"}
        >
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}
