export default function Gear() {
  return (
    <div className="gear-wrap" aria-hidden="true">
      <svg
        className="gear-svg"
        width="420"
        height="420"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="var(--color-bg-gear)">
          {Array.from({ length: 12 }, (_, index) => (
            <rect
              key={index}
              x="89"
              y="5"
              width="22"
              height="34"
              rx="3"
              transform={`rotate(${index * 30} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="68" />
        </g>
        <circle cx="100" cy="100" r="28" fill="var(--color-bg)" />
      </svg>
    </div>
  );
}
