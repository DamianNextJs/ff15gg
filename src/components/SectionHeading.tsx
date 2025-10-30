export default function SectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
      {children}
    </h2>
  );
}
