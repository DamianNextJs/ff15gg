import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { RegionKey, regionMap } from "@/lib/maps/regionMap";
import { SummonerData } from "@/types/summoner";
import { User } from "@/types/user";
import { DDragon } from "@/utils/ddragon";
import Image from "next/image";
import { useState } from "react";

interface SummonerCardProps {
  summonerToBind?: SummonerData;
  boundSummoner?: User["boundRiotAccount"];
  handleBindClick?: () => void;
  handleRemoveClick?: () => void;
}

export default function SummonerCard({
  summonerToBind,
  handleBindClick,
  boundSummoner,
  handleRemoveClick,
}: SummonerCardProps) {
  const [open, setOpen] = useState(false);
  const profileIconId =
    summonerToBind?.summoner.profileIconId || boundSummoner?.profileIconId;
  const summonerLevel =
    summonerToBind?.summoner.summonerLevel || boundSummoner?.summonerLevel;
  const gameName =
    summonerToBind?.riotAccount.gameName || boundSummoner?.gameName;
  const tagLine = summonerToBind?.riotAccount.tagLine || boundSummoner?.tagLine;
  const platform = summonerToBind?.platform || boundSummoner?.platform;

  const profileIcon = DDragon.profileIcon(profileIconId ?? 0);

  return (
    <div className="flex items-center justify-between gap-2 mt-3 bg-secondary p-2 rounded-md lg:w-125">
      <div className="flex items-center gap-2">
        <Image src={profileIcon} alt="profile icon" width={40} height={40} />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="truncate max-w-40">
              {gameName}#{tagLine}
            </p>
            <div
              className={`${
                regionMap[platform as RegionKey].color
              } text-xs p-0.5 rounded-xs w-10 text-center text-white font-bold`}
            >
              {regionMap[platform as RegionKey].label}
            </div>
          </div>
          <p className="text-sm text-subtle/75">Lvl {summonerLevel}</p>
        </div>
      </div>
      {boundSummoner ? (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-red-500 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
          <Modal
            onClose={() => setOpen(false)}
            open={open}
            title="Remove Bound Summoner?"
          >
            <p className="text-sm">
              Are you sure you want to remove Summoner: <br />{" "}
              <i>
                {gameName} #{tagLine}
              </i>{" "}
              from your account?
            </p>
            <Button color={"bg-red-500"} onClick={handleRemoveClick}>
              Remove Summoner
            </Button>
          </Modal>
        </div>
      ) : (
        <Button onClick={handleBindClick}>Bind</Button>
      )}
    </div>
  );
}
