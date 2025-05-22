import { BusinessType } from "../../../lib/data";

export function BusinessTypeCard({
  type,
  isSelected,
  onClick,
}: {
  type: BusinessType;
  isSelected: boolean;
  onClick: () => void;
}) {
  const { label, description, icon: Icon } = type;

  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-6 flex flex-col items-center gap-3 text-center transition-all duration-200 border 
        ${isSelected ? "border-primary bg-muted" : "border-muted bg-muted/50 hover:bg-muted"}`}
    >
      <div className={`p-3 rounded-full bg-muted-foreground/10 ${isSelected ? "text-primary" : "text-foreground"}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-semibold text-foreground text-sm">{label}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}