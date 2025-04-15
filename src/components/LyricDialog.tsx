'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { MicVocal } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import { TextGenerateEffect } from './ui/text-generation-effect'
import { getLyrics } from '@/actions/lyrics-actions'
import Spinner from './Spinner'

const LyricDialog = ({ song }: { song: Song }) => {
  const [lyrics, setLyrics] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchLyrics = async () => {
    if (lyrics) return
    setIsLoading(true)
    try {
      const fetchedLyrics = await getLyrics(song.url)
      setLyrics(fetchedLyrics)
    } catch (error) {
      console.error('Failed to fetch lyrics:', error)
      setLyrics('Failed to load lyrics')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open && !lyrics) {
          fetchLyrics()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          effect={'expandIcon'}
          icon={MicVocal}
          iconPlacement="right"
          size={'sm'}
          className="cursor-pointer max-w-[10rem] text-xs"
        >
          View Lyrics
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[calc(100%-2rem)] w-[calc(100%-2rem)] flex flex-col">
        <DialogHeader className="h-fit">
          <div className="flex items-center gap-4">
            <Image
              priority
              className="rounded aspect-square"
              height={50}
              width={50}
              src={song.image}
              alt={song.title}
            />
            <div className="flex flex-col items-start">
              <DialogTitle className="text-primary text-base line-clamp-1 text-start mb-2">
                {song.title}
              </DialogTitle>
              <div className="flex flex-col gap-2 items-start text-muted-foreground">
                <p className="text-xs font-medium">{song.artistName}</p>
                <p className="text-xs font-medium">{song.releaseDate}</p>
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogDescription hidden aria-readonly>Lyrics for {song.title}</DialogDescription>
        <div className="text-start no-scrollbar overflow-y-scroll flex-1">
          {isLoading ? (
            <Spinner />
          ) : (
            <TextGenerateEffect words={lyrics} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LyricDialog