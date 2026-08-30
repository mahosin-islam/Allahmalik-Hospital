"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Maximize,
} from "lucide-react";

const videos = [
  {
    id: "v1",
    title: "বাতব্যথা, স্ট্রোক ও প্যারালাইসিস চিকিৎসা",
    url: "https://res.cloudinary.com/rob9jlkw/video/upload/v1786674529/7c974cf8-62c3-4030-ab9b-a92c979e0f5d_iptwpr.mp4",
  },
  {
    id: "v2",
    title: "বিশেষজ্ঞ চিকিৎসকের পরামর্শ ও সেবা",
    url: "https://res.cloudinary.com/rob9jlkw/video/upload/v1786674505/41fbb110-7c8e-466d-96be-696f3746f1a7_feqwzh.mp4",
  },
  {
    id: "v3",
    title: "আল্লাহ মালিক হাসপাতাল ও ডায়াগনস্টিক সেন্টার",
    url: "https://res.cloudinary.com/rob9jlkw/video/upload/v1786674470/e74f137b-87ea-4dac-a219-d632049b5dd8_bqxqkd.mp4",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [needsSoundTap, setNeedsSoundTap] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const wasPlayingBeforeLeave = useRef(false);
  const wasMutedBeforeLeave = useRef(false);

  // Try autoplay WITH sound first; fallback to muted autoplay if blocked
  const attemptAutoplay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = false;
      await video.play();
      setIsMuted(false);
      setIsPlaying(true);
      setNeedsSoundTap(false);
    } catch {
      try {
        video.muted = true;
        await video.play();
        setIsMuted(true);
        setIsPlaying(true);
        setNeedsSoundTap(true);
      } catch {
        setIsPlaying(false);
      }
    }
  }, []);

  // Autoplay on mount
  useEffect(() => {
    attemptAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autoplay on slide change (only if section is currently visible)
  useEffect(() => {
    if (isInView) attemptAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Enable sound on first user interaction
  useEffect(() => {
    if (!needsSoundTap) return;

    const enableSound = () => {
      const video = videoRef.current;
      if (video) {
        video.muted = false;
        setIsMuted(false);
      }
      setNeedsSoundTap(false);
    };

    const section = sectionRef.current;
    section?.addEventListener("click", enableSound, { once: true });

    return () => {
      section?.removeEventListener("click", enableSound);
    };
  }, [needsSoundTap]);

  // 🟢 Intersection Observer: pause + mute when scrolled out of view,
  // resume with previous state when scrolled back into view
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Section back in view -> restore previous state
          setIsInView(true);
          if (wasPlayingBeforeLeave.current) {
            video.muted = wasMutedBeforeLeave.current;
            setIsMuted(wasMutedBeforeLeave.current);
            video.play().catch(() => {});
            setIsPlaying(true);
          }
        } else {
          // Section scrolled away -> remember state, then pause + mute
          setIsInView(false);
          wasPlayingBeforeLeave.current = !video.paused;
          wasMutedBeforeLeave.current = video.muted;

          video.pause();
          video.muted = true;
          setIsMuted(true);
          setIsPlaying(false);
        }
      },
      { threshold: 0.4 } // considers "in view" once 40% of section is visible
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration > 0) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
    if (!next) setNeedsSoundTap(false);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRef.current?.requestFullscreen?.();
  };

  const goToSlide = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[65dvh] sm:h-[75dvh] md:h-[85dvh] lg:h-[calc(100dvh-80px)] bg-black overflow-hidden group select-none"
    >
      <video
        ref={videoRef}
        src={videos[currentIndex].url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => handleNext()}
        autoPlay
        playsInline
        preload="auto"
        className="w-full h-full object-cover cursor-pointer"
        onClick={togglePlay}
      />

      {needsSoundTap && isInView && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 shadow-lg animate-pulse"
        >
          <VolumeX className="w-4 h-4 text-rose-400" />
          <span>শব্দ চালু করতে স্পর্শ করুন</span>
        </button>
      )}

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 max-w-[75%]">
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] sm:text-xs font-semibold mb-2">
          আল্লাহ মালিক হাসপাতাল বরগুনা
        </span>
        <h2 className="text-sm sm:text-xl md:text-2xl font-bold text-white drop-shadow-md leading-snug">
          {videos[currentIndex].title}
        </h2>
      </div>

      <button
        onClick={handlePrev}
        aria-label="Previous Video"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      <button
        onClick={(e) => handleNext(e)}
        aria-label="Next Video"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity">
        <div className="w-full h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden mb-3 sm:mb-4 cursor-pointer">
          <div
            className="h-full bg-emerald-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={togglePlay}
              className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all active:scale-90"
              aria-label="Play/Pause"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className={`p-2 sm:p-2.5 rounded-xl backdrop-blur-md transition-all active:scale-90 ${
                isMuted
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                  : "bg-white/10 hover:bg-white/20 text-emerald-400"
              }`}
              aria-label="Mute/Unmute"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />
              ) : (
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              )}
            </button>

            <div className="text-xs sm:text-sm font-semibold text-white/80 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
              {currentIndex + 1} / {videos.length}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 mr-2">
              {videos.map((vid, idx) => (
                <button
                  key={vid.id}
                  onClick={(e) => goToSlide(idx, e)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all ${
                    currentIndex === idx
                      ? "w-6 sm:w-8 bg-emerald-500"
                      : "w-2 sm:w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleFullscreen}
              className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all active:scale-90 hidden sm:flex"
              aria-label="Fullscreen"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}