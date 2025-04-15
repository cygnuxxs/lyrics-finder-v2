import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import LinkedIn from "./LinkedIn";
import Github from "./Github";
import Instagram from "./Instagram";
import { Mail } from "lucide-react";
import { FlipWords } from "./ui/flip-words";

const Info = () => {
  const favourites = [
    "Creepin",
    "Starboy",
    "Blinding Lights",
    "Fear Song",
    "Summertime Sadness",
    "Shape of You",
    "Perfect",
    "Spirit of Jersey"
  ];
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">
        My Favourites : <FlipWords words={favourites} />
      </h1>
      <p className="text-lg font-semibold">
        Developed and Maintained by{" "}
        <Link className="text-primary" href={"https://github.com/cygnuxxs"}>
          Cygnuxxs
        </Link>
      </p>
      <div className="flex justify-between flex-wrap items-center rounded-xl">
        <div className="flex gap-2">
          <Link
            href={"https://linkedin.com/in/cygnuxxs"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="icon"
              variant="outline"
              className={`transition-all hover:bg-[#0077B5] hover:text-white`}
            >
              <LinkedIn />
            </Button>
          </Link>
          <Link
            href={"https://github.com/cygnuxxs"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="icon"
              variant="outline"
              className={`transition-all hover:bg-foreground hover:text-background`}
            >
              <Github />
            </Button>
          </Link>
          <Link
            href={"mailto:ashok7075657409@gmail.com"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="icon"
              variant="outline"
              className={`transition-all hover:bg-foreground hover:text-background`}
            >
              <Mail />
            </Button>
          </Link>
          <Link
            href={"https://instagram.com/cygnuxxs"}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Button
              size="icon"
              variant="outline"
              className={`transition-all hover:bg-foreground hover:text-background`}
            >
              <Instagram />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Info;
