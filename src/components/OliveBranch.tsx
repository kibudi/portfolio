const leafCount = 9;

/**
 * A gold olive branch growing from the bottom corner, the theme's version
 * of the bamboo in the original Figma's cards. Leaves alternate sides along
 * a curved stem and get smaller toward the tip. Decorative only; colors
 * follow `currentColor`.
 */
export function OliveBranch({ className }: { className: string }) {
  const leaves = Array.from({ length: leafCount }, (_, i) => {
    const t = (i + 1) / (leafCount + 1);
    const x = 190 - 170 * t;
    const y = 200 - 185 * t + 40 * t * (1 - t);
    const side = i % 2 === 0 ? 1 : -1;
    const length = 46 - 22 * t;
    const angle = -50 + side * 38;
    return { x, y, length, angle };
  });

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <path d="M190 200 Q120 120 20 15" fill="none" stroke="currentColor" strokeWidth="2" />
      {leaves.map((leaf) => (
        <path
          key={leaf.x}
          d={`M0 0 Q${leaf.length / 2} -${leaf.length / 5} ${leaf.length} 0 Q${leaf.length / 2} ${leaf.length / 5} 0 0 Z`}
          fill="currentColor"
          transform={`translate(${leaf.x.toFixed(1)} ${leaf.y.toFixed(1)}) rotate(${leaf.angle})`}
        />
      ))}
    </svg>
  );
}
