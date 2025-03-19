import { catClient } from "./client.js";

export const catService = {
  getRandomCats(limit=10,breed_ids="") {
    return catClient.get(`/images/search?limit=${limit}&breed_ids=${breed_ids}`);
  },
};