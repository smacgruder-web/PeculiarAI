'use client';

import { useEffect, useRef } from 'react';

interface VisualEqualizerProps {
  analyser: AnalyserNode | null;
  active: boolean;
  barCount?: number;
  className?: string;
  mirrored?: boolean;
}

function barHeightFromVoice(
  freqData: Uint8Array,
  timeData: Uint8Array,
  barIndex: number,
  barCount: number,
  mirrored: boolean,
): number {
  const bufferLength = freqData.length;
  const half = Math.floor(barCount / 2);
  const idx = mirrored
    ? barIndex < half
      ? half - 1 - barIndex
      : barIndex - half
    : barIndex;

  // Voice energy lives in lower-mid bins (~100Hz–4kHz)
  const speechStart = 2;
  const speechEnd = Math.min(64, bufferLength - 1);
  const band = speechStart + Math.floor((idx / (mirrored ? half : barCount)) * (speechEnd - speechStart));
  let energy = freqData[Math.min(band, bufferLength - 1)] ?? 0;

  // Waveform RMS gives punch on consonants and pauses
  let sum = 0;
  const step = Math.max(1, Math.floor(timeData.length / 32));
  for (let i = 0; i < timeData.length; i += step) {
    const sample = (timeData[i] - 128) / 128;
    sum += sample * sample;
  }
  const rms = Math.sqrt(sum / (timeData.length / step));
  energy = Math.min(255, energy * (1.1 + rms * 3.2));

  const normalized = energy / 255;
  return Math.max(0.06, Math.min(1, Math.pow(normalized, 0.75)));
}

export default function VisualEqualizer({
  analyser,
  active,
  barCount = 40,
  className = '',
  mirrored = true,
}: VisualEqualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const drawIdle = (width: number, height: number, time: number) => {
      const count = mirrored ? Math.floor(barCount / 2) : barCount;
      const gap = 3;
      const barWidth = (width - gap * (barCount - 1)) / barCount;

      for (let i = 0; i < barCount; i++) {
        const sourceIndex = mirrored
          ? i < count
            ? count - 1 - i
            : i - count
          : i;
        const wave = 0.1 + Math.sin(time * 0.0015 + sourceIndex * 0.4) * 0.05;
        const barHeight = height * wave;
        const x = i * (barWidth + gap);
        const y = (height - barHeight) / 2;

        const gradient = ctx.createLinearGradient(x, y + barHeight, x, y);
        gradient.addColorStop(0, 'rgba(45, 212, 191, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 122, 92, 0.45)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, barWidth / 2);
        ctx.fill();
      }
    };

    const drawLive = (width: number, height: number) => {
      if (!analyser) {
        drawIdle(width, height, performance.now());
        return;
      }

      const freqData = new Uint8Array(analyser.frequencyBinCount);
      const timeData = new Uint8Array(analyser.fftSize);
      analyser.getByteFrequencyData(freqData);
      analyser.getByteTimeDomainData(timeData);

      const gap = 3;
      const barWidth = (width - gap * (barCount - 1)) / barCount;

      for (let i = 0; i < barCount; i++) {
        const level = barHeightFromVoice(freqData, timeData, i, barCount, mirrored);
        const barHeight = height * level * 0.95;
        const x = i * (barWidth + gap);
        const y = (height - barHeight) / 2;

        const gradient = ctx.createLinearGradient(x, y + barHeight, x, y);
        gradient.addColorStop(0, 'rgba(45, 212, 191, 0.55)');
        gradient.addColorStop(0.45, 'rgba(45, 212, 191, 1)');
        gradient.addColorStop(1, 'rgba(255, 122, 92, 1)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, barWidth / 2);
        ctx.fill();
      }
    };

    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      if (active && analyser) {
        drawLive(width, height);
      } else {
        drawIdle(width, height, time);
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [active, analyser, barCount, mirrored]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}