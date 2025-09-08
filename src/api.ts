
import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export interface Profile {
  id?: number;
  name: string;
  email: string;
  age?: number | null;
}

const client = axios.create({ baseURL: BASE, timeout: 3000 });

export const api = {
  getProfile: async (): Promise<Profile | null> => {
  try {
    const res = await client.get("/profile");
    // Only return if response is a valid profile object
    if (res.data && typeof res.data === "object" && res.data.name) {
      return res.data;
    }
    return null;
  } catch (err: any) {
    console.warn("API down, using localStorage...");
    const local = localStorage.getItem("profile");
    try {
      const parsed = JSON.parse(local || "null");
      // Only return if parsed is a valid profile object
      if (parsed && typeof parsed === "object" && parsed.name) {
        return parsed;
      }
    } catch {
      // If localStorage contains invalid data (like HTML), clear it
      localStorage.removeItem("profile");
    }
    return null;
  }
},

  saveProfile: async (profile: Profile): Promise<Profile> => {
    try {
      if ((profile as any).id) {
        const res = await client.put("/profile", profile);
        localStorage.setItem("profile", JSON.stringify(res.data));
        return res.data;
      } else {
        const res = await client.post("/profile", profile);
        localStorage.setItem("profile", JSON.stringify(res.data));
        return res.data;
      }
    } catch (err) {
      console.warn("API down, saving to localStorage...");
      localStorage.setItem("profile", JSON.stringify(profile));
      return profile;
    }
  },

  deleteProfile: async (): Promise<void> => {
    try {
      await client.delete("/profile");
      localStorage.removeItem("profile");
    } catch (err) {
      console.warn("API down, deleting from localStorage...");
      localStorage.removeItem("profile");
    }
  },
};
