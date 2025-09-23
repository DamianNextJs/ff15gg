export default function NotInGame({
  name,
  tag,
}: {
  name: string;
  tag: string;
}) {
  return (
    <div className="bg-accent p-2 rounded-md -mt-1 flex flex-col justify-center items-center text-center gap-4 h-75">
      <p className="text-2xl font-semibold">
        {/* Add riot game name and tag here */}
        &apos;{name} #{tag}&apos; is currently not in a game.
      </p>
      <p className="text-subtle  text-lg">
        Game just started? Try <b className="text-white">refreshing</b> once the
        Loading Screen appears.
      </p>
    </div>
  );
}
