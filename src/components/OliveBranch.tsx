const leafCount = 9;

export function OliveBranch({ className }: { className: string }) {
  const leaves = Array.from({ length: leafCount }, (_, leafIndex) => {
    const positionAlongStem = (leafIndex + 1) / (leafCount + 1);
    const leafX = 190 - 170 * positionAlongStem;
    const leafY = 200 - 185 * positionAlongStem + 40 * positionAlongStem * (1 - positionAlongStem);
    const leafSide = leafIndex % 2 === 0 ? 1 : -1;
    const leafLength = 46 - 22 * positionAlongStem;
    const leafAngle = -50 + leafSide * 38;
    return { x: leafX, y: leafY, length: leafLength, angle: leafAngle };
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
