import SummonerSearch from "../searchbar/components/SummonerSearch";

interface SidebarDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidebarDrawer({
  isOpen,
  setIsOpen,
}: SidebarDrawerProps) {
  return (
    <div
      className={`w-full lg:w-64 p-4 h-screen bg-accent absolute left-0 top-0 mt-16 border-t-2 border-secondary transition-transform duration-200
         ease-in-out ${
           isOpen ? "translate-x-0" : "-translate-x-full lg:-translate-x-64"
         }`}
    >
      <SummonerSearch variant="drawer" setIsOpen={setIsOpen} />
    </div>
  );
}
