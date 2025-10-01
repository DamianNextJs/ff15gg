import PostGame from "./PostGameComponents/PostGame";

export default function MatchDetail() {
  return (
    <div className="bg-accent/30 p-2 -mt-2  rounded-b-md border-t border-accent ">
      <div className="border-b border-accent -mx-2 px-2 pb-2">Post Game</div>
      <PostGame />
    </div>
  );
}
