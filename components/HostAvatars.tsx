'use client';

import { useEffect, useRef, useState } from 'react';

export interface Host {
  id: string;
  name: string;
  image: string;
  video?: string;
}

interface HostAvatarsProps {
  hosts: Host[];
  analyser: AnalyserNode | null;
  active: boolean;
  currentTime: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function HostAvatars({
  hosts,
  analyser,
  active,
  currentTime,
  isPlaying,
  onTogglePlay,
}: HostAvatarsProps) {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [energy, setEnergy] = useState(0);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!active || !analyser) {
      setEnergy(0);
      return;
    }

    const freq = new Uint8Array(analyser.frequencyBinCount);
    const time = new Uint8Array(analyser.fftSize);
    let frame = 0;

    const tick = () => {
      analyser.getByteFrequencyData(freq);
      analyser.getByteTimeDomainData(time);

      let sum = 0;
      const speechEnd = Math.min(48, freq.length);
      for (let i = 2; i < speechEnd; i++) {
        sum += freq[i];
      }
      const avg = sum / (speechEnd - 2);

      let rms = 0;
      for (let i = 0; i < time.length; i++) {
        const sample = (time[i] - 128) / 128;
        rms += sample * sample;
      }
      rms = Math.sqrt(rms / time.length) * 255;

      const level = Math.min(1, (avg * 0.55 + rms * 0.45) / 110);
      setEnergy((prev) => prev * 0.62 + level * 0.38);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, analyser]);

  useEffect(() => {
    for (const video of videoRefs.current) {
      if (!video) continue;
      if (Math.abs(video.currentTime - currentTime) > 0.25) {
        video.currentTime = currentTime;
      }
      if (isPlaying && video.paused) {
        void video.play().catch(() => undefined);
      }
      if (!isPlaying && !video.paused) {
        video.pause();
      }
    }
  }, [currentTime, isPlaying]);

  const glow = 12 + energy * 36;
  const hasLipSync = hosts.some((host) => host.video && !failedVideos[host.id]);

  return (
    <div className="relative w-full max-w-2xl mx-auto grid grid-cols-2 gap-3 sm:gap-5 mb-4">
      {hosts.slice(0, 2).map((host, index) => (
        <button
          key={host.id}
          type="button"
          onClick={onTogglePlay}
          className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0f14] text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2dd4bf]/50"
          style={{
            boxShadow: active
              ? `0 0 ${glow}px rgba(45, 212, 191, ${0.15 + energy * 0.35})`
              : '0 0 0 transparent',
            transition: 'box-shadow 80ms linear',
          }}
          aria-label={`${isPlaying ? 'Pause' : 'Play'} ${host.name}`}
        >
          {/* 3:4 head-and-shoulders — object-top keeps full head in frame */}
          <div className="aspect-[3/4] w-full bg-[#0a0b0e]">
            {host.video && !failedVideos[host.id] ? (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={host.video}
                poster={host.image}
                muted
                playsInline
                preload="metadata"
                onError={() => setFailedVideos((prev) => ({ ...prev, [host.id]: true }))}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <img
                src={host.image}
                alt={host.name}
                className="h-full w-full object-cover object-top"
                style={{
                  filter: active ? `brightness(${1 + energy * 0.08})` : undefined,
                }}
              />
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-3 pt-10 pb-2.5 pointer-events-none">
            <p className="text-xs font-semibold tracking-wide text-white">{host.name}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#2dd4bf]/80">
              {host.video ? 'Lip-sync' : 'Co-host'}
            </p>
          </div>
          {active && (
            <div
              className="absolute inset-0 pointer-events-none bg-[#2dd4bf]/10"
              style={{ opacity: 0.08 + energy * 0.22 }}
            />
          )}
        </button>
      ))}
      {!hasLipSync && (
        <p className="col-span-2 text-center text-[10px] uppercase tracking-wider text-slate-600 -mt-1">
          Lip-sync videos pending — run scripts/render-host-lipsync.sh
        </p>
      )}
    </div>
  );
}