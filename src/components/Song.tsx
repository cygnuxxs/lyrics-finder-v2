'use client'
import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";
import { Calendar, CircleUser, Disc3 } from "lucide-react";
import LyricDialog from "./LyricDialog";
import { motion } from "framer-motion";

const Song = ({ song }: { song: Song }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full border rounded-md flex gap-2 p-4 bg-card"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          alt={song.title}
          src={song.image}
          height={100}
          width={100}
          priority
          className="object-cover rounded-md"
        />
      </motion.div>
      <div className="flex flex-col w-full gap-2">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="text-base font-semibold"
        >
          {song.title}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
          className="flex flex-wrap gap-4"
        >
          {song.albumName && (
            <Badge variant={"secondary"} className="h-fit w-fit">
              <Disc3 className="w-4 h-4 mr-1" />
              {song.albumName}
            </Badge>
          )}
          {song.artistName && (
            <Badge variant={"secondary"} className="h-fit w-fit">
              <CircleUser className="w-4 h-4 mr-1" />
              {song.artistName}
            </Badge>
          )}
          {song.releaseDate && (
            <Badge variant={"secondary"} className="h-fit w-fit">
              <Calendar className="w-4 h-4 mr-1" />
              {song.releaseDate}
            </Badge>
          )}
        </motion.div>
        <LyricDialog song={song} />
      </div>
    </motion.div>
  );
};

export default Song;