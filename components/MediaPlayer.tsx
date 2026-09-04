'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import VisualEqualizer from '@/components/VisualEqualizer';
import HostAvatars, { type Host } from '@/components/HostAvatars';
import { useMediaAnalyser } from '@/hooks/useMediaAnalyser';
import { getAudioMimeType, getVideoMimeType } from '@/lib/utils';

interface MediaPlayerProps {
  type: 'video' | 'audio';
  src: string;
  title: string;
  poster?: string;
  hosts?: Host[];
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function MediaPlayer({ type, src, title, poster, hosts }: MediaPlayerProps) {
  const audioMime = getAudioMimeType(src);
  const videoMime = getVideoMimeType(src);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  const { connect, analyserRef } = useMediaAnalyser(mediaRef);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  const isPodcast = type === 'audio' && Boolean(hosts?.length);

  useEffect(() => {
    setIsPlaying(false);
    setHasStarted(false);
    setCurrentTime(0);
    setDuration(0);
    setAnalyser(null);
  }, [src, type]);

  useEffect(() => {
    const node = mediaRef.current;
    if (!node) return;

    const onPlay = () => {
      setIsPlaying(true);
      setHasStarted(true);
      setAnalyser(analyserRef.current);
    };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(node.currentTime);
    const onLoadedMetadata = () => setDuration(node.duration);
    const onDurationChange = () => setDuration(node.duration);

    node.addEventListener('play', onPlay);
    node.addEventListener('pause', onPause);
    node.addEventListener('ended', onEnded);
    node.addEventListener('timeupdate', onTimeUpdate);
    node.addEventListener('loadedmetadata', onLoadedMetadata);
    node.addEventListener('durationchange', onDurationChange);

    return () => {
      node.removeEventListener('play', onPlay);
      node.removeEventListener('pause', onPause);
      node.removeEventListener('ended', onEnded);
      node.removeEventListener('timeupdate', onTimeUpdate);
      node.removeEventListener('loadedmetadata', onLoadedMetadata);
      node.removeEventListener('durationchange', onDurationChange);
    };
  }, [analyserRef, src, type]);

  const togglePlay = useCallback(async () => {
    const node = mediaRef.current;
    if (!node) return;

    if (node.paused) {
      const nodeAnalyser = await connect();
      setAnalyser(nodeAnalyser);
      setHasStarted(true);
      await node.play();
    } else {
      node.pause();
    }
  }, [connect]);

  const handleSeek = (value: number) => {
    const node = mediaRef.current;
    if (!node || !Number.isFinite(duration)) return;
    node.currentTime = value;
    setCurrentTime(value);
  };

  const toggleMute = () => {
    const node = mediaRef.current;
    if (!node) return;
    node.muted = !node.muted;
    setMuted(node.muted);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative">
      {type === 'video' ? (
        <div className="relative aspect-video bg-[#0a0b0e]">
          {!hasStarted && (
            <button
              type="button"
              onClick={() => void togglePlay()}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#0d0f14]/95 via-[#11141A]/90 to-[#0a0b0e]/95 cursor-pointer group/poster"
              aria-label={`Watch ${title}`}
            >
              {poster ? (
                <div className="absolute inset-0">
                  <img
                    src={poster}
                    alt=""
                    className="w-full h-full object-cover opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-[#0a0b0e]/70 to-transparent" />
                </div>
              ) : null}
              <div className="relative w-full max-w-md px-8 h-20">
                <VisualEqualizer analyser={null} active={false} barCount={36} className="opacity-50" />
              </div>
              <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-center justify-center group-hover/poster:bg-[#2dd4bf]/15 group-hover/poster:border-[#2dd4bf]/40 transition-all shadow-[0_0_40px_rgba(45,212,191,0.15)]">
                <Play className="w-7 h-7 text-[#2dd4bf] ml-1" fill="currentColor" />
              </div>
              <span className="relative text-[11px] tracking-[0.2em] uppercase text-slate-500">Watch story</span>
            </button>
          )}
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            className={`w-full h-full object-cover transition-opacity duration-300 ${!hasStarted ? 'opacity-0' : 'opacity-100'}`}
            preload="metadata"
            playsInline
          >
            <source src={src} {...(videoMime ? { type: videoMime } : {})} />
          </video>
          {hasStarted && (
            <>
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-14 px-6 h-12 pointer-events-none">
                <VisualEqualizer analyser={analyser} active={isPlaying} barCount={40} className="opacity-90" />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="relative min-h-[360px] md:min-h-[420px] bg-gradient-to-b from-[#0d0f14] to-[#0a0b0e] flex flex-col items-center justify-center px-6 py-8">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-32 bg-[#2dd4bf]/5 blur-[80px] rounded-full" />
          </div>

          {hosts && hosts.length > 0 ? (
            <div className="relative w-full">
              <HostAvatars
                hosts={hosts}
                analyser={analyser}
                active={isPlaying}
                currentTime={currentTime}
                isPlaying={isPlaying}
                onTogglePlay={() => void togglePlay()}
              />
            </div>
          ) : poster ? (
            <div className="relative w-full max-w-md mb-4 rounded-2xl overflow-hidden border border-white/10">
              <img src={poster} alt="" className="w-full aspect-video object-cover" />
            </div>
          ) : null}

          <div className="relative w-full max-w-lg h-24 md:h-28">
            <VisualEqualizer analyser={analyser} active={isPlaying} barCount={48} />
          </div>
          <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} src={src} preload="metadata">
            {audioMime ? <source src={src} type={audioMime} /> : null}
          </audio>
        </div>
      )}

      <div className="border-t border-white/10 bg-[#0d0f14]/95 backdrop-blur-md px-4 sm:px-5 py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => void togglePlay()}
            className="shrink-0 w-11 h-11 rounded-xl bg-[#2dd4bf]/15 border border-[#2dd4bf]/35 flex items-center justify-center text-[#2dd4bf] hover:bg-[#2dd4bf]/25 hover:border-[#2dd4bf]/55 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <span className="text-[11px] tabular-nums text-slate-500 w-10 text-right shrink-0">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="media-progress flex-1 h-1.5 appearance-none rounded-full bg-white/10 cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #2dd4bf ${progress}%, rgba(255,255,255,0.1) ${progress}%)`,
                }}
                aria-label="Seek"
              />
              <span className="text-[11px] tabular-nums text-slate-500 w-10 shrink-0">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleMute}
            className="shrink-0 w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-colors"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
        {isPodcast && !hosts?.some((host) => host.video) && (
          <p className="mt-3 text-[10px] text-slate-600 text-center">
            Audio plays from podcast track · lip-sync renders appear when MP4s land in /media/
          </p>
        )}
      </div>
    </div>
  );
}