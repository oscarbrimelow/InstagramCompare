import type { ComparisonResult, InstagramProfileData } from "../types/instagram";

export const compareProfileData = ({ followers, following }: InstagramProfileData): ComparisonResult => {
  const followerSet = new Set(followers.map((username) => username.toLowerCase()));
  const followingSet = new Set(following.map((username) => username.toLowerCase()));

  const mutuals = followers.filter((username) => followingSet.has(username.toLowerCase()));
  const youDontFollowBack = followers.filter((username) => !followingSet.has(username.toLowerCase()));
  const notFollowingYouBack = following.filter((username) => !followerSet.has(username.toLowerCase()));

  return {
    mutuals,
    youDontFollowBack,
    notFollowingYouBack
  };
};

