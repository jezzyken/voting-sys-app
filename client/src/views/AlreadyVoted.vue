<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="already-voted-card">
          <v-card-text class="text-center pa-6">
            <!-- Icon/Image -->
            <v-avatar size="120" class="mb-6">
              <v-img
                src="https://dwtyzx6upklss.cloudfront.net/Pictures/2000xAny/3/5/7/21357_pri_boardelections_hero_777797.png"
                alt="Already Voted"
              >
                <!-- Fallback icon -->
                <template v-slot:placeholder>
                  <v-icon size="80" color="warning">mdi-alert-circle</v-icon>
                </template>
              </v-img>
            </v-avatar>

            <!-- Main Message -->
            <h1 class="text-h4 font-weight-bold warning--text mb-4">
              You've Already Voted!
            </h1>

            <p class="text-subtitle-1 grey--text text--darken-1 mb-6">
              You have already cast your vote for this election. Each student is
              allowed to vote only once.
            </p>

            <!-- Vote Details -->
            <v-card outlined class="mb-6">
              <v-card-title class="primary--text">
                <v-icon left color="primary">mdi-information</v-icon>
                Vote Details
              </v-card-title>

              <v-card-text class="pt-4">
                <v-row align="center" class="mb-2">
                  <v-col cols="12" sm="4" class="text-sm-right grey--text">
                    Election:
                  </v-col>
                  <v-col
                    cols="12"
                    sm="8"
                    class="text-sm-left font-weight-medium"
                  >
                    {{ electionDetails?.name || "Student Election" }}
                  </v-col>
                </v-row>

                <v-row align="center" class="mb-2">
                  <v-col cols="12" sm="4" class="text-sm-right grey--text">
                    Status:
                  </v-col>
                  <v-col cols="12" sm="8" class="text-sm-left">
                    <v-chip small color="success"> Vote Recorded </v-chip>
                  </v-col>
                </v-row>

                <v-row align="center" v-if="voteDetails?.timestamp">
                  <v-col cols="12" sm="4" class="text-sm-right grey--text">
                    Voted On:
                  </v-col>
                  <v-col
                    cols="12"
                    sm="8"
                    class="text-sm-left font-weight-medium"
                  >
                    {{ formatDate(voteDetails.timestamp) }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Action Buttons -->
            <v-card-actions class="justify-center pt-6">
              <v-btn
                color="primary"
                outlined
                class="mr-2"
                :to="{ path: '/election/portal' }"
              >
                <v-icon left>mdi-home</v-icon>
                Back to Home
              </v-btn>

              <v-btn
                v-if="showResults"
                color="primary"
                :to="{ name: 'ElectionResults', params: { id: electionId } }"
              >
                <v-icon left>mdi-poll</v-icon>
                View Results
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>

        <!-- Help Section -->
        <v-card outlined class="mt-6">
          <v-card-text class="text-center">
            <p class="mb-2">Need help or have questions?</p>
            <v-btn text color="primary" @click="showContactDialog = true">
              <v-icon left>mdi-help-circle</v-icon>
              Contact Support
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contact Support Dialog -->
    <v-dialog v-model="showContactDialog" max-width="500px">
      <v-card>
        <v-card-title class="primary white--text">
          Contact Support
          <v-spacer></v-spacer>
          <v-btn icon dark @click="showContactDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-4">
          <p class="mb-4">
            If you have any questions or concerns, please contact:
          </p>

          <v-list dense>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-email</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  >election.support@school.edu</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>(123) 456-7890</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "AlreadyVoted",

  data() {
    return {
      electionDetails: null,
      voteDetails: null,
      loading: false,
      error: null,
      showContactDialog: false,
    };
  },

  computed: {
    electionId() {
      return this.$route.params.id;
    },
    showResults() {
      return this.electionDetails?.showResults || false;
    },
  },

  methods: {
    async fetchElectionDetails() {
      this.loading = true;
      try {
        const response = await this.$http.get(`/election/${this.electionId}`);
        this.electionDetails = response.data;
      } catch (error) {
        console.error("Error fetching election details:", error);
        this.error = "Failed to load election details";
      } finally {
        this.loading = false;
      }
    },

    async fetchVoteDetails() {
      try {
        const response = await this.$http.get(
          `/votes/details/${this.electionId}/${this.$store.state.auth.student._id}`
        );
        this.voteDetails = response.data;
      } catch (error) {
        console.error("Error fetching vote details:", error);
      }
    },

    formatDate(dateString) {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date(dateString));
    },
  },

  async created() {
    await Promise.all([this.fetchElectionDetails(), this.fetchVoteDetails()]);
  },
};
</script>

<style scoped>
.already-voted-card {
  background: linear-gradient(to bottom right, #ffffff, #f8f8f8);
  border-radius: 16px;
}

.already-voted-card {
  transition: all 0.3s ease;
}

.already-voted-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.already-voted-card {
  animation: slideIn 0.5s ease-out;
}

.v-expansion-panels {
  background: transparent !important;
}
</style>
