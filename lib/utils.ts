import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mediaExtension(src: string): string {
  const path = src.split('?')[0]?.split('#')[0] ?? '';
  const ext = path.split('.').pop();
  return ext?.toLowerCase() ?? '';
}

export function getAudioMimeType(src: string): string | undefined {
  switch (mediaExtension(src)) {
    case 'mp3':
      return 'audio/mpeg';
    case 'm4a':
    case 'mp4':
      return 'audio/mp4';
    case 'aac':
      return 'audio/aac';
    case 'wav':
      return 'audio/wav';
    case 'ogg':
    case 'oga':
      return 'audio/ogg';
    case 'webm':
      return 'audio/webm';
    default:
      return undefined;
  }
}

export function getVideoMimeType(src: string): string | undefined {
  switch (mediaExtension(src)) {
    case 'mp4':
    case 'm4v':
      return 'video/mp4';
    case 'webm':
      return 'video/webm';
    case 'ogv':
      return 'video/ogg';
    default:
      return undefined;
  }
}
