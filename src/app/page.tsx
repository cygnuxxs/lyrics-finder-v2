import { searchSongs } from "@/actions/lyrics-actions";
import Info from "@/components/Info";
import Song from "@/components/Song";
import { ModeToggle } from "@/components/ThemeToggler";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Link from "next/link";

async function SongList() {
  const results = await searchSongs();

  return (
    <div className="flex my-2 overflow-y-scroll no-scrollbar h-[calc(100%-6rem)] flex-col gap-4">
      {results === null ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Info />
        </div>
      ) : results.length > 0 ? (
        results.map((song) => <Song key={song.songId} song={song} />)
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center text-muted-foreground">No songs found</p>
          <Info />
        </div>
      )}
    </div>
  );
}

const Homepage = async () => {
  const placeholders = [
    "Type Starboy.",
    "My Favourite is 'Creepin'.",
    "Search lyrics for your favourites.",
    "Regional songs maybe available.",
  ];
  return (
    <div className="w-dvw h-dvh flex bg-secondary items-center justify-center">
      <div className="max-w-3xl bg-background border border-accent w-full rounded-lg p-4 h-full sm:h-[calc(100dvh-3rem)]">
        <nav className="w-full flex justify-between">
          <p className="font-bold text-lg">
            Lyrics Finder{" "}
            <Link
              href={"https://github.com/cygnuxxs"}
              target="_blank"
              className="text-xs font-semibold text-primary"
            >
              by Cygnuxxs
            </Link>
          </p>
          <ModeToggle />
        </nav>
        <PlaceholdersAndVanishInput placeholders={placeholders} />
        <SongList />
      </div>
    </div>
  );
};

export default Homepage;
