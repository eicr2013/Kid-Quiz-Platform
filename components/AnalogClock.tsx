'use client';

interface AnalogClockProps {
  hours: number;
  minutes: number;
}

export default function AnalogClock({ hours, minutes }: AnalogClockProps) {
  const size = 200;
  const centerX = size / 2;
  const centerY = size / 2;
  const clockRadius = 80;

  // Convert to 12-hour format
  const displayHours = hours % 12 || 12;

  // Calculate angles (0 degrees is at 12 o'clock, clockwise)
  const minuteAngle = (minutes / 60) * 360 - 90; // -90 to start from top
  const hourAngle = ((displayHours / 12) * 360 + (minutes / 60) * 30) - 90; // Hour hand moves as minutes pass

  // Hand lengths
  const hourHandLength = clockRadius * 0.5;
  const minuteHandLength = clockRadius * 0.7;

  // Calculate hand positions
  const hourHandX = centerX + hourHandLength * Math.cos((hourAngle * Math.PI) / 180);
  const hourHandY = centerY + hourHandLength * Math.sin((hourAngle * Math.PI) / 180);

  const minuteHandX = centerX + minuteHandLength * Math.cos((minuteAngle * Math.PI) / 180);
  const minuteHandY = centerY + minuteHandLength * Math.sin((minuteAngle * Math.PI) / 180);

  // Hour markers
  const hourMarkers = [];
  for (let i = 1; i <= 12; i++) {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
    const markerRadius = clockRadius - 10;
    const x = centerX + markerRadius * Math.cos(angle);
    const y = centerY + markerRadius * Math.sin(angle);

    hourMarkers.push(
      <text
        key={i}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fontWeight="bold"
        fill="#1F2937"
      >
        {i}
      </text>
    );
  }

  // Minute tick marks
  const minuteTicks = [];
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) { // Skip hour positions
      const angle = (i / 60) * 2 * Math.PI - Math.PI / 2;
      const innerRadius = clockRadius - 5;
      const outerRadius = clockRadius - 2;
      
      const x1 = centerX + innerRadius * Math.cos(angle);
      const y1 = centerY + innerRadius * Math.sin(angle);
      const x2 = centerX + outerRadius * Math.cos(angle);
      const y2 = centerY + outerRadius * Math.sin(angle);

      minuteTicks.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#9CA3AF"
          strokeWidth="1"
        />
      );
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      <title>Clock showing {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}</title>
      
      {/* Clock face */}
      <circle
        cx={centerX}
        cy={centerY}
        r={clockRadius}
        fill="white"
        stroke="#1F2937"
        strokeWidth="3"
      />

      {/* Minute tick marks */}
      {minuteTicks}

      {/* Hour markers */}
      {hourMarkers}

      {/* Hour hand */}
      <line
        x1={centerX}
        y1={centerY}
        x2={hourHandX}
        y2={hourHandY}
        stroke="#1F2937"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Minute hand */}
      <line
        x1={centerX}
        y1={centerY}
        x2={minuteHandX}
        y2={minuteHandY}
        stroke="#3B82F6"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Center dot */}
      <circle cx={centerX} cy={centerY} r="6" fill="#EF4444" />
      <circle cx={centerX} cy={centerY} r="3" fill="white" />
    </svg>
  );
}
