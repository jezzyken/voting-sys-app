import axios from "axios";

import { baseURL, currentEnv } from "@/config/baseURL";

const API_URL = baseURL;

console.log({ API_URL });

export default {
  async getDashboardStatistics() {
    try {
      const response = await axios.get(`${API_URL}/dashboard/statistics`);
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error);
      throw error;
    }
  },

  async getCurrentElections() {
    try {
      const response = await axios.get(
        `${API_URL}/dashboard/current-elections`
      );

      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error fetching current elections:", error);
      throw error;
    }
  },

  async getVotingTrends() {
    try {
      const response = await axios.get(`${API_URL}/dashboard/voting-trends`);
      return response.data;
    } catch (error) {
      console.error("Error fetching voting trends:", error);
      throw error;
    }
  },

  async getParticipationStats() {
    try {
      const response = await axios.get(
        `${API_URL}/dashboard/participation-stats`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching participation stats:", error);
      throw error;
    }
  },
};
