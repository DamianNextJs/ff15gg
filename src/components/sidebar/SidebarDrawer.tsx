import SummonerSearch from "../searchbar/components/SummonerSearch";
import { useSidebarDrawer } from "./context/SidebarDrawerContext";
import SidebarUserCard from "./SidebarUserCard";

export default function SidebarDrawer() {
  const { isOpen } = useSidebarDrawer();
  return (
    <div
      className={`w-full lg:w-64 p-4 h-screen bg-accent absolute left-0 top-0 mt-16 border-t-2 shadow shadow-black border-secondary transition-transform duration-200
         ease-in-out ${
           isOpen ? "translate-x-0" : "-translate-x-full lg:-translate-x-64"
         }`}
    >
      <SummonerSearch variant="drawer" />

      <SidebarUserCard />
    </div>
  );
}
