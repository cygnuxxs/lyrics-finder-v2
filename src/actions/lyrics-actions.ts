"use server";
import { getGeniusClient } from "@/lib/geniusClient";
import { cookies } from "next/headers";
const geniusClient = getGeniusClient();

export async function searchSongs() {
  const songName = (await cookies()).get("songName");
  if (!songName) {
    console.log("No songName cookie found");
    return null;
  }
  console.log(songName.value);
  try {
    const response = await geniusClient.songs.search(songName.value);
    console.log(response);
    const songs = response.map((song) => ({
      songId: song.id,
      title: song.title,
      fullTitle: song.fullTitle,
      image: song.thumbnail,
      artistName: song.artist?.name ?? "Unknown Artist",
      albumName: song.album?.title ?? "Unknown Album",
      url: song.url,
      releaseDate: song._raw?.release_date_with_abbreviated_month_for_display ?? "Unknown Date",
    }));
    console.log("Songs fetched:", songs);
    return songs;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error searching songs:", error.message);
    } else {
      console.error("Error searching songs:", error);
    }
    return [];
  }
}
export async function getLyrics(songUrl: string) {
  const response = await geniusClient.songs.scrape(songUrl)
  const lyrics = response.lyrics()
  return lyrics;
}

export async function storeSongCookie(formData : FormData) {
  const songName = formData.get('songName') as string;
  const cookieStore = await cookies();
  cookieStore.set('songName', songName, {maxAge : 5, path : '/'});
}
