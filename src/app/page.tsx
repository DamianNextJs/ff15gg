import SummonerSearch from "../components/HomePageComponents/SummonerSearch";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-[url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_17.jpg)] bg-[position:30%_20%]">
        <div className="absolute inset-0 bg-primary/10 backdrop-brightness-50" />
      </div>
      {/* Content */}
      <div className="min-h-screen flex flex-col justify-start lg:justify-center items-center space-y-5 lg:space-y-10 translate-y-25 lg:-translate-y-30 mx-4">
        <h1 className="text-6xl lg:text-8xl font-semibold">
          FF15 <span className="text-primary">.</span> GG
        </h1>
        <SummonerSearch />
      </div>
    </main>
  );
}
