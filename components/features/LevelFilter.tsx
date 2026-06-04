"use client";

type Props = {
  selected: string;
  onChange: (level: string) => void;
};

export default function LevelFilter({
  selected,
  onChange,
}: Props) {
  const levels = ["All", "L3", "L4", "L5", "L6"];

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => onChange(level)}
          className={`px-4 py-2 rounded-lg border ${
            selected === level
              ? "bg-blue-600 text-white"
              : "bg-white"
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
}