export default function NotFound() {
  return (
    <div className="flex justify-center flex-col-reverse items-center md:flex-row mx-4  gap-20 h-3/4">
      <div className="text-3xl md:text-5xl uppercase font-bold space-y-5  md:border-b  pb-10 text-center">
        <div>This Page</div>
        <div>Doesn't Exist</div>
      </div>
      <div className="text-7xl md:text-9xl font-extrabold border-b md:border-none w-full md:w-fit text-center md:text-justify pb-10">
        404
      </div>
    </div>
  );
}
