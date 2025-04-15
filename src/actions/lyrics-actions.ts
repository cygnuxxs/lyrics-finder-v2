"use server";
import { cookies } from "next/headers";
import { cache } from "react";

export const searchSongs = cache(async () => {
  const songName = (await cookies()).get("songName");
  if (!songName) {
    console.log("No songName cookie found");
    return null;
  }
  try {
    const response = await fetch(`https://api.genius.com/search?q=${songName.value}`, {
      headers : {
        Authorization: `Bearer ${process.env.CLIENT_TOKEN}`,
        "Content-Type": "application/json",
      }
    }).then((res) => res.json());
    type Hit = {
      result: {
        id: number;
        title: string;
        full_title: string;
        song_art_image_url: string;
        primary_artist?: { name: string };
        album?: { name: string };
        url: string;
        release_date_with_abbreviated_month_for_display?: string;
      };
    };

    const songs: Song[] = response.response.hits.map((hit: Hit) => ({
      songId: hit.result.id,
      title: hit.result.title,
      fullTitle: hit.result.full_title,
      image: hit.result.song_art_image_url,
      artistName: hit.result.primary_artist?.name ?? '',
      albumName: hit.result.album?.name ?? '',
      url: hit.result.url,
      releaseDate: hit.result.release_date_with_abbreviated_month_for_display ?? "Unknown Date",
    }));
    return songs
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error searching songs:", error.message);
    } else {
      console.error("Error searching songs:", error);
    }
    return [];
  }
})


// export const getLyrics = cache(async (songUrl: string) => {
//   const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(songUrl);
//   const response = await fetch(proxyUrl);
//   if (!response.ok) { 
//     const body = response.body
//     console.error("Fetch failed", response.status, response.statusText, body);
//     throw new Error("Failed to fetch lyrics", {cause : response.statusText});
//   }
//   const html = await response.text();
//   const $ = load(html);

//   const lyricsContainers = $('div[class*="Lyrics__Container"]');
//   lyricsContainers.find('div[class*="RightSidebar__"]').remove();
//   lyricsContainers.find('button').remove();

//   const lyrics = lyricsContainers
//     .map((_, container) => {
//       const $container = $(container);
//       let sectionText = '';
      
//       $container.contents().each((_, el) => {
//         // Handle different node types safely
//         if (el.type === 'text') {
//           sectionText += $(el).text().trim() + '\n';
//         }
//         // Check if it's an element node first
//         else if (el.type === 'tag') {
//           const $el = $(el);
//           if (el.tagName.toLowerCase() === 'br') {
//             sectionText += '\n';
//           }
//           else if ($el.is('a')) {
//             sectionText += $el.text().trim();
//           }
//         }
//       });
      
//       return sectionText.replace(/^\n+|\n+$/g, '');
//     })
//     .get()
//     .join('\n\n');

//   if (!lyrics.trim()) {
//     throw new Error("Lyrics not found");
//   }

//   return lyrics;
// });

export const getLyrics = cache(async (songName : string, artistName : string) => {
  const api =`https://api.lyrics.ovh/v1/${artistName}/${songName}`;
  const response = await fetch(api);
  if (!response.ok) {
    const body = response.body
    console.error("Fetch failed", response.status, response.statusText, body);
    throw new Error("Failed to fetch lyrics", {cause : response.statusText});
  }
  const data = await response.json();
  if (data.error) {
    throw new Error("Lyrics not found");
  }
  return data.lyrics;
})

export async function storeSongCookie(formData : FormData) {
  const songName = formData.get('songName') as string;
  const cookieStore = await cookies();
  cookieStore.set('songName', songName, {maxAge : 5, path : '/'});
}
