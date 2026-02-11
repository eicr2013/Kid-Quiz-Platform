'use client';

interface FractionShapeProps {
  numerator: number;
  denominator: number;
  shape?: 'circle' | 'rectangle';
}

export default function FractionShape({ numerator, denominator, shape = 'circle' }: FractionShapeProps) {
  if (shape === 'circle') {
    return <FractionCircle numerator={numerator} denominator={denominator} />;
  }
  return <FractionRectangle numerator={numerator} denominator={denominator} />;
}

function FractionCircle({ numerator, denominator }: { numerator: number; denominator: number }) {
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  // Create pie slices
  const slices = [];
  const anglePerSlice = (2 * Math.PI) / denominator;

  for (let i = 0; i < denominator; i++) {
    const startAngle = i * anglePerSlice - Math.PI / 2;
    const endAngle = startAngle + anglePerSlice;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArc = anglePerSlice > Math.PI ? 1 : 0;

    // Path for the slice
    const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    const isShaded = i < numerator;

    slices.push(
      <path
        key={i}
        d={path}
        fill={isShaded ? '#3B82F6' : '#E5E7EB'}
        stroke="#1F2937"
        strokeWidth="2"
      />
    );
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
      <title>Fraction circle showing {numerator}/{denominator}</title>
      {slices}
      {/* Center dot */}
      <circle cx={centerX} cy={centerY} r="2" fill="#1F2937" />
    </svg>
  );
}

function FractionRectangle({ numerator, denominator }: { numerator: number; denominator: number }) {
  const width = 240;
  const height = 80;
  const padding = 20;
  const boxWidth = (width - padding * 2) / denominator;

  const boxes = [];
  for (let i = 0; i < denominator; i++) {
    const x = padding + i * boxWidth;
    const isShaded = i < numerator;

    boxes.push(
      <g key={i}>
        <rect
          x={x}
          y={padding}
          width={boxWidth - 2}
          height={height - padding * 2}
          fill={isShaded ? '#3B82F6' : '#E5E7EB'}
          stroke="#1F2937"
          strokeWidth="2"
        />
      </g>
    );
  }

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mx-auto">
      <title>Fraction rectangle showing {numerator}/{denominator}</title>
      {boxes}
    </svg>
  );
}
