"use client";
import SectionHeading from "@/components/SectionHeading";
import { queueMap } from "@/lib/maps/queueMap";
import { formatGameDuration } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function LiveGameInfo({
  gameQueue,
  gameLength,
}: {
  gameQueue: number;
  gameLength: number;
}) {
  const queue = queueMap[gameQueue];

  const INITIAL_OFFSET = 120;

  const [elapsedTime, setElapsedTime] = useState(
    Math.max(0, gameLength + INITIAL_OFFSET)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SectionHeading>
      <div className="flex items-center gap-2">
        {queue} <p className="text-subtle/50">/</p>{" "}
        {formatGameDuration(elapsedTime)}
      </div>
    </SectionHeading>
  );
}
