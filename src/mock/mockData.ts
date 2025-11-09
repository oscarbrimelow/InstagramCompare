import type { InstagramProfileData } from "../types/instagram";

export const mockProfiles: Record<string, InstagramProfileData> = {
  alex: {
    followers: ["mia", "jordan", "casey", "sam", "taylor", "blair"],
    following: ["mia", "jordan", "sam", "harper", "jules", "nico"]
  },
  blair: {
    followers: ["alex", "harper", "jules", "morgan"],
    following: ["alex", "casey", "devon", "river", "morgan"]
  },
  creatorhub: {
    followers: ["artistdaily", "video_vibes", "snapqueen", "sam"],
    following: ["video_vibes", "snapqueen", "travelnerd", "sam"]
  }
};

export const defaultProfile: InstagramProfileData = {
  followers: ["user1", "user2", "user3", "user5"],
  following: ["user2", "user3", "user4", "user6"]
};

