import SummonerSearch from "./components/SummonerSearch";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Riven_23.jpg"
          alt="Background champion"
          fill // makes it cover the parent
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-primary/10 backdrop-brightness-50 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
      </div>
      {/* Content */}
      <div className="min-h-screen flex flex-col justify-center items-center gap-5 lg:gap-10 -translate-y-30 mx-4">
        <h1 className="text-4xl lg:text-6xl font-semibold">
          FF15 <span className="text-primary">.</span> GG
        </h1>
        <SummonerSearch />
      </div>
    </main>
  );
}
