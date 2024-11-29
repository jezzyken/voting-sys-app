<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="mt-5 text-center primary-gradient">
          <v-card-title
            class="justify-center display-1 font-weight-bold white--text"
          >
            Welcome to the Student Elections Portal
          </v-card-title>
          <v-card-text>
            <p class="subtitle-1 white--text">
              Make your voice heard! Participate in shaping the future of our
              student community.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12">
        <v-card v-if="ongoingElections.length > 0" class="elevation-2">
          <v-card-title class="headline primary--text">
            <v-icon large color="primary" class="mr-2">mdi-vote</v-icon>
            Ongoing Elections
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="election in ongoingElections"
                :key="election._id"
                cols="12"
                md="4"
              >
                <v-card outlined class="h-100">
                  <v-card-title class="subtitle-1 font-weight-bold">
                    {{ election.name }}
                  </v-card-title>
                  <v-card-text>
                    <v-list-item two-line dense>
                      <v-list-item-content>
                        <v-list-item-subtitle class="mb-1">
                          <v-icon small class="mr-1">mdi-calendar</v-icon>
                          {{
                            formatDateRange(
                              election.startDate,
                              election.endDate
                            )
                          }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                          <v-icon small class="mr-1">mdi-tag</v-icon>
                          {{ election.electionType }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                  <v-card-actions class="justify-center pb-4">
                    <v-btn
                      color="primary"
                      outlined
                      rounded
                      @click="goToVoting(election._id)"
                    >
                      <v-icon left>mdi-vote</v-icon>
                      Cast Your Vote
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card v-else class="text-center pa-6">
          <v-icon large color="grey" class="mb-2">mdi-calendar-blank</v-icon>
          <div class="text-h6 grey--text">
            No ongoing elections at the moment
          </div>
          <div class="text-subtitle-1 grey--text text--darken-1">
            Please check back later for upcoming elections
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" md="6">
        <v-card height="100%" hover class="elevation-2">
          <v-card-title class="justify-center headline">
            <v-icon large color="success" class="mr-2">mdi-poll</v-icon>
            Election Results
          </v-card-title>

          <v-card-text>
            <v-list v-if="completedElections.length > 0">
              <v-list-item
                v-for="election in completedElections"
                :key="election._id"
                @click="viewElectionResults(election._id)"
                class="mb-2"
              >
                <v-list-item-avatar>
                  <v-icon
                    :color="getElectionStatusColor(election.status)"
                    large
                  >
                    mdi-chart-bar
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium">
                    {{ election.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-icon small class="mr-1">mdi-calendar</v-icon>
                    {{ formatDateRange(election.startDate, election.endDate) }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    color="success"
                    outlined
                    small
                    @click.stop="viewElectionResults(election._id)"
                  >
                    View Results
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-sheet v-else class="text-center pa-4">
              <v-icon large color="grey" class="mb-2"
                >mdi-poll-box-outline</v-icon
              >
              <div class="text-subtitle-1 grey--text text--darken-1">
                No election results available yet
              </div>
            </v-sheet>
          </v-card-text>

          <v-overlay :value="loadingResults" absolute>
            <v-progress-circular indeterminate></v-progress-circular>
          </v-overlay>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card height="100%" hover class="elevation-2">
          <v-card-title class="justify-center headline">
            <v-icon large color="info" class="mr-2">mdi-account-group</v-icon>
            Candidate Information
          </v-card-title>
          <v-card-text class="text-center">
            <p class="mb-6">
              Learn about the candidates running for various positions.
            </p>
            <v-btn color="primary" large rounded dark @click="viewCandidates">
              <v-icon left>mdi-account-details</v-icon>
              Meet the Candidates
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ongoingElections: [],
      completedElections: [],
      loading: false,
      loadingResults: false,
      error: null,
    };
  },
  methods: {
    formatDateRange(startDate, endDate) {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const start = new Date(startDate).toLocaleDateString(undefined, options);
      const end = new Date(endDate).toLocaleDateString(undefined, options);
      return `${start} - ${end}`;
    },

    getElectionStatusColor(status) {
      const colors = {
        completed: "success",
        ongoing: "warning",
        upcoming: "info",
      };
      return colors[status] || "grey";
    },

    async goToVoting(electionId) {
      try {
        await this.$router.push(`/election/portal/votes/${electionId}`);
      } catch (error) {
        console.error("Navigation error:", error);
      }
    },

    async fetchCompletedElections() {
      console.log("test");
      this.loadingResults = true;
      try {
        const response = await this.$http.get("/election/completed/events");
        this.completedElections = response.data;
      } catch (error) {
        console.error("Error fetching completed elections:", error);
        alert("Failed to load election results");
      } finally {
        this.loadingResults = false;
      }
    },

    async viewElectionResults(electionId) {
      try {
        await this.$router.push(`/election/results/${electionId}`);
      } catch (error) {
        console.error("Navigation error:", error);
      }
    },
    viewCandidates() {
      this.$router.push("/election/portal/candidates");
    },
    async fetchOngoingElections() {
      this.loading = true;
      try {
        const response = await this.$http.get("/election/ongoing/events");
        this.ongoingElections = response.data;
      } catch (error) {
        console.error("Error fetching ongoing elections:", error);
        this.error = "Failed to load elections. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    await Promise.all([
      this.fetchOngoingElections(),
      this.fetchCompletedElections(),
    ]);
  },
};
</script>

<style scoped>
.primary-gradient {
  background: linear-gradient(to right, #1976d2, #64b5f6);
}

.h-100 {
  height: 100%;
}

.v-list-item {
  transition: background-color 0.2s ease;
  border-radius: 4px;
  margin: 4px 0;
}

.v-list-item:hover {
  background-color: #f5f5f5;
}

.v-list {
  max-height: 400px;
  overflow-y: auto;
}
</style>
