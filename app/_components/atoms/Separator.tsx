interface Props {
  text?: string;
}

export const Separater = ({ text }: Props) => {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-card px-2 text-muted-foreground">{text}</span>
      </div>
    </div>
  );
};
