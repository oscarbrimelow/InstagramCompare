import type { InstagramProfileData } from "../types/instagram";
import { defaultProfile, mockProfiles } from "../mock/mockData";

const NETWORK_DELAY_IN_MS = 750;

export interface FetchInstagramDataOptions {
  signal?: AbortSignal;
}

export const fetchInstagramData = async (
  username: string,
  options?: FetchInstagramDataOptions
): Promise<InstagramProfileData> => {
  const normalizedUsername = username.trim().toLowerCase();

  if (!normalizedUsername) {
    throw new Error("Please provide a valid username.");
  }

  return new Promise<InstagramProfileData>((resolve, reject) => {
    const timer = setTimeout(() => {
      const profile = mockProfiles[normalizedUsername] ?? defaultProfile;

      if (!profile) {
        reject(new Error("No data found for this username."));
        return;
      }

      resolve(JSON.parse(JSON.stringify(profile)) as InstagramProfileData);
    }, NETWORK_DELAY_IN_MS + Math.random() * 500);

    options?.signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new Error("The request was cancelled."));
      },
      { once: true }
    );
  });
};

/**
 * Placeholder for future real API integration.
 * Replace the implementation above with a call to the Instagram Graph API using an access token.
 */
export const fetchInstagramDataFromGraphAPI = async (_username: string, _accessToken: string) => {
  throw new Error("Instagram Graph API integration not implemented yet.");
};

