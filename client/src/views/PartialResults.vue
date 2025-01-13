<template>
  <v-container>
    <!-- Header Section -->
    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="12">
        <v-card class="primary" dark>
          <v-card-text class="text-center py-4">
            <h1 class="text-h4 font-weight-bold mb-2">Partial Election Results</h1>
            <p class="subtitle-1 mb-0">
              {{ electionDetails?.name || "Student Election" }}
            </p>
            <div class="mt-2">
              <v-chip small color="white" text-color="primary" class="mr-2">
                Votes Cast: {{ totalVotesCast }}
              </v-chip>
              <v-chip small color="warning">ONGOING</v-chip>
            </div>
            <div class="subtitle-2 mt-2">
              Last Updated: {{ lastUpdated }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Navigation Buttons -->
    <v-row class="mb-4">
      <v-col cols="12" class="d-flex">
        <v-btn color="primary" outlined @click="$router.go(-1)">
          <v-icon left>mdi-arrow-left</v-icon>
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="refreshResults">
          <v-icon left>mdi-refresh</v-icon>
          Refresh Results
        </v-btn>
      </v-col>
    </v-row>

    <!-- Loading State -->
    <v-row v-if="loading" justify="center" align="center" style="min-height: 400px">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
        <div class="mt-4 text-subtitle-1">Loading Results...</div>
      </v-col>
    </v-row>

    <!-- Error State -->
    <v-alert v-else-if="error" type="error" class="mb-4">
      {{ error }}
      <template v-slot:append>
        <v-btn text small color="error" @click="fetchResults">Retry</v-btn>
      </template>
    </v-alert>

    <!-- Results Content -->
    <template v-else>
      <v-row v-for="(candidates, position) in results" :key="position">
        <v-col cols="12">
          <v-card class="mb-6">
            <v-card-title class="primary--text">
              <v-icon left color="primary">mdi-account-group</v-icon>
              {{ position.toUpperCase() }}
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col v-for="(candidate, index) in sortCandidatesByVotes(candidates)" 
                       :key="candidate.candidateId"
                       cols="12" sm="6" md="4">
                  <v-card outlined>
                    <v-card-text class="text-center pa-4">
                      <v-avatar size="120" class="mb-3">
                        <v-img
                          :src="candidate.imageUrl"
                          v-if="candidate.imageUrl"
                        >
                          <template v-slot:placeholder>
                            <v-avatar color="grey lighten-4" size="120">
                              <v-icon size="64">mdi-account</v-icon>
                            </v-avatar>
                          </template>
                        </v-img>
                        <v-avatar v-else color="grey lighten-4" size="120">
                          <v-icon size="64">mdi-account</v-icon>
                        </v-avatar>
                      </v-avatar>
                      
                      <div class="text-h6 mb-2">{{ candidate.studentName }}</div>
                      
                      <v-chip small :color="getRankColor(index + 1)" dark class="mb-3">
                        Rank {{ index + 1 }}
                      </v-chip>
                      
                      <div class="text-body-1 mb-2">
                        {{ candidate.votes }} votes
                      </div>
                      
                      <v-progress-linear
                        :value="calculatePercentage(candidate.votes)"
                        height="20"
                        :color="getRankColor(index + 1)"
                        class="mt-2"
                      >
                        <template v-slot:default>
                          {{ calculatePercentage(candidate.votes) }}%
                        </template>
                      </v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <v-btn color="primary" outlined class="mt-4" :to="{ path: '/election/portal' }">
      <v-icon left>mdi-arrow-left</v-icon>
      Back to Elections
    </v-btn>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="4000" bottom>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PartialResults',

  data: () => ({
    results: null,
    electionDetails: null,
    loading: false,
    error: null,
    totalVotesCast: 0,
    lastUpdated: '',
    snackbar: {
      show: false,
      text: '',
      color: 'info'
    }
  }),

  computed: {
    electionId() {
      return this.$route.params.id;
    }
  },

  methods: {
    async fetchResults() {
      this.loading = true;
      this.error = null;
      try {
        const [resultsResponse, electionResponse] = await Promise.all([
          this.$http.get(`/vote/partial-results/${this.electionId}`),
          this.$http.get(`/election/${this.electionId}`)
        ]);

        this.results = resultsResponse.data.data.results;
        this.electionDetails = electionResponse.data;

        console.log(resultsResponse.data.data.results)
        this.totalVotesCast = resultsResponse.data.data.totalVotesCast;
        this.lastUpdated = moment().format('MMMM D, YYYY h:mm:ss A');
      } catch (error) {
        console.error('Error fetching results:', error);
        this.error = 'Failed to load partial election results. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    sortCandidatesByVotes(candidates) {
      return [...candidates].sort((a, b) => (b.votes || 0) - (a.votes || 0));
    },

    calculatePercentage(votes) {
      if (!votes || !this.totalVotesCast) return 0;
      return ((votes / this.totalVotesCast) * 100).toFixed(1);
    },

    getRankColor(rank) {
      const colors = {
        1: 'success',
        2: 'info',
        3: 'warning'
      };
      return colors[rank] || 'grey';
    },

    async refreshResults() {
      await this.fetchResults();
      this.showSnackbar('Results refreshed', 'success');
    },

    showSnackbar(text, color = 'info') {
      this.snackbar = {
        show: true,
        text,
        color
      };
    }
  },

  created() {
    this.fetchResults();
  }
};
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.v-progress-linear {
  border-radius: 4px;
}

@media (max-width: 600px) {
  .v-card-title {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>