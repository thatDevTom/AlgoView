import { SortStep } from "@/types/algorithm";

const CHART_HEIGHT = 320;
const BAR_WIDTH = 32;
const BAR_GAP = 6;

const COLORS = {
  default: "#a1a1aa",
  comparing: "#facc15",
  swapped: "#f87171",
  sorted: "#4ade80",
};

function barColor(
  index: number,
  { comparingIndices, swappedIndices, sortedIndices }: SortStep
): string {
  // Precedence ensures a just-swapped bar is not hidden by its comparison state.
  if (swappedIndices.includes(index)) return COLORS.swapped;
  if (comparingIndices.includes(index)) return COLORS.comparing;
  if (sortedIndices.includes(index)) return COLORS.sorted;
  return COLORS.default;
}

type BarChartProps = {
  step: SortStep;
};

/** Renders one SortStep as animated SVG bars. */
export function BarChart({ step }: BarChartProps) {
  const { array } = step;
  const maxValue = Math.max(...array, 1);
  const totalWidth = array.length * (BAR_WIDTH + BAR_GAP);

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${CHART_HEIGHT}`}
      width="100%"
      height={CHART_HEIGHT}
      role="img"
      aria-label="Array visualization"
    >
      {array.map((value, index) => {
        // Reserve space above each bar for its numeric label.
        const barHeight = (value / maxValue) * (CHART_HEIGHT - 24);
        const x = index * (BAR_WIDTH + BAR_GAP);
        const y = CHART_HEIGHT - barHeight;

        return (
          <g key={index}>
            <rect
              x={x}
              y={y}
              width={BAR_WIDTH}
              height={barHeight}
              rx={3}
              fill={barColor(index, step)}
              style={{
                transition:
                  "x 0.25s ease, y 0.25s ease, height 0.25s ease, fill 0.25s ease",
              }}
            />
            <text
              x={x + BAR_WIDTH / 2}
              y={y - 6}
              textAnchor="middle"
              fontSize={11}
              fill="currentColor"
              style={{ transition: "x 0.25s ease, y 0.25s ease" }}
            >
              {value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
