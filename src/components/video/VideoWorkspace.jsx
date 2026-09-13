import React from "react";
import { ThreeSpatialVideoChamber } from "../3d/ThreeSpatialVideoChamber";

export const VideoWorkspace = ({ soundState, videoData = {} }) => {
  // Dynamic CMS Data Mapping
  const data = {
    badgeText: videoData.badgeText || "3D SPATIAL VIDEO LAB",
    headlinePrefix: videoData.headlinePrefix || "Crafting",
    headlineHighlight: videoData.headlineHighlight || "Hypnotic Edits",
    headlineSuffix: videoData.headlineSuffix || "in 3D Virtual Space",
    description: videoData.description || "Short-form video editing isn't just cutting clips—it's psychological pacing, rhythmic sound design, speed ramps, and retention engineering assembled in a live 3D space.",
    videoPreviewUrl: videoData.videoPreviewUrl || "/shally.png",
    subtitleHookText: videoData.subtitleHookText || "“STOP LOSING 70% OF SCROLLERS IN THE FIRST 3 SECONDS.”",
    trackV2Label: videoData.trackV2Label || "[3s HOOK TITLE]",
    trackV1Label: videoData.trackV1Label || "HOOK_CLIP_A.mp4",
    trackA1Label: videoData.trackA1Label || "WHOOSH_01",
    trackA2Label: videoData.trackA2Label || "VIRAL_TIKTOK_AUDIO_TREND.wav (128 BPM)"
  };

  return (
    <ThreeSpatialVideoChamber
      data={data}
      soundState={soundState}
    />
  );
};
