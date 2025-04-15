"use server";
import { getGeniusClient } from "@/lib/geniusClient";
import { cookies } from "next/headers";
const geniusClient = getGeniusClient();

// const delay = (ms : number) => new Promise((resolve) => setTimeout(resolve, ms))
export async function searchSongs() {
  const songName = (await cookies()).get("songName");
  if (!songName) {
    return null;
  }
  const response = await geniusClient.songs.search(songName.value);
  const songs = response.map((song) => ({
    songId: song.id,
    title: song.title,
    fullTitle: song.fullTitle,
    image: song.thumbnail,
    artistName: song.artist?.name as string,
    albumName: song.album?.title as string,
    url: song.url,
    releaseDate: song._raw?.release_date_with_abbreviated_month_for_display as string,
  }));
  return songs
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
