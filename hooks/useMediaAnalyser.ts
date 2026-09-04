'use client';

import { useCallback, useEffect, useRef } from 'react';

export function useMediaAnalyser(mediaRef: React.RefObject<HTMLMediaElement | null>) {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const connectedRef = useRef(false);

  const connect = useCallback(async () => {
    const media = mediaRef.current;
    if (!media) return null;
    if (connectedRef.current && analyserRef.current) return analyserRef.current;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      const ctx = audioContextRef.current ?? new AudioCtx();
      audioContextRef.current = ctx;
      if (ctx.state === 'suspended') await ctx.resume();

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.55;
      analyser.minDecibels = -85;
      analyser.maxDecibels = -20;

      const source = ctx.createMediaElementSource(media);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      analyserRef.current = analyser;
      connectedRef.current = true;
      return analyser;
    } catch {
      return null;
    }
  }, [mediaRef]);

  useEffect(() => {
    connectedRef.current = false;
    analyserRef.current = null;
    void audioContextRef.current?.close();
    audioContextRef.current = null;
  }, [mediaRef]);

  useEffect(() => {
    return () => {
      connectedRef.current = false;
      analyserRef.current = null;
      void audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, []);

  return { connect, analyserRef };
}