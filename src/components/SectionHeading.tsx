export default function SectionHeading({ text }: { text: string }) {
  return (
    <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
      {text}
    </h2>
  );
}
