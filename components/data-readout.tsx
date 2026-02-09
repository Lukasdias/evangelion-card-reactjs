"use client";

interface DataReadoutProps {
  label: string;
  value: string | number;
  unit?: string;
  variant?: "melchior" | "balthasar" | "caspar" | "cyan";
}

export function DataReadout({ label, value, unit, variant = "cyan" }: DataReadoutProps) {
  const colors = {
    melchior: "text-magi-melchior",
    balthasar: "text-magi-balthasar",
    caspar: "text-magi-caspar",
    cyan: "text-magi-cyan",
  };

  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-magi-text-dim text-[10px] font-semibold tracking-widest uppercase">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className={`font-mono text-lg font-normal ${colors[variant]}`}>{value}</span>
        {unit && <span className="text-magi-text-dim text-xs">{unit}</span>}
      </div>
    </div>
  );
}
