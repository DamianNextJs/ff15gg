import SummonerSearch from "../components/SummonerSearch";

export default function Home() {
  return (
    <div className="min-h-screen bg-cover md:bg-center bg-[url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_17.jpg)] overflow-hidden bg-[position:30%_20%]">
      <div className="min-h-screen bg-primary/10 backdrop-brightness-50 ">
        <div className="min-h-screen flex flex-col justify-start md:justify-center items-center  space-y-5 md:space-y-10  translate-y-25 md:-translate-y-25  mx-4 ">
          <h1 className="text-6xl sm:text-8xl">
            FF15 <span className="text-primary">.</span> GG
          </h1>
          <SummonerSearch />
        </div>
      </div>
    </div>
  );
}
