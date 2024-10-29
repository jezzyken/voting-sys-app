<template>
  <v-container>
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="8" lg="6">
        <v-card class="text-center pa-6 success-card">
          <v-card-text>
            <v-avatar size="120" class="mb-6">
              <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBY1UftFxb9DVTzyUN8YWM5YnAwF0pOKOG4A&s" alt="Success">
                <template v-slot:placeholder>
                  <v-icon size="80" color="success">mdi-check-circle</v-icon>
                </template>
              </v-img>
            </v-avatar>

            <h1 class="text-h4 font-weight-bold success--text mb-4">
              Vote Submitted Successfully!
            </h1>

            <p class="text-subtitle-1 grey--text text--darken-1 mb-6">
              Thank you for participating in the student election. Your vote has been recorded.
            </p>

            <v-card outlined class="mb-6">
              <v-card-text>
                <v-row align="center" class="mb-2">
                  <v-col cols="12" sm="4" class="text-sm-right grey--text">
                    Election:
                  </v-col>
                  <v-col cols="12" sm="8" class="text-sm-left font-weight-medium">
                    {{ electionDetails?.name || 'Student Election' }}
                  </v-col>
                </v-row>

                <v-row align="center" class="mb-2">
                  <v-col cols="12" sm="4" class="text-sm-right grey--text">
                    Date Submitted:
                  </v-col>
                  <v-col cols="12" sm="8" class="text-sm-left font-weight-medium">
                    {{ formatDate(new Date()) }}
                  </v-col>
                </v-row>

                <v-row align="center">
                  <v-col cols="12" sm="4" class="text-sm-right grey--text">
                    Reference ID:
                  </v-col>
                  <v-col cols="12" sm="8" class="text-sm-left">
                    <v-chip small color="primary" class="font-weight-medium">
                      {{ generateReferenceId() }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Important Notice -->
            <!-- <v-alert
              type="info"
              outlined
              class="mb-6 text-left"
              border="left"
            >
              <div class="text-subtitle-2 font-weight-bold mb-2">
                Important Notice:
              </div>
              <ul class="mb-0">
                <li>Your vote has been securely recorded</li>
                <li>You cannot modify your vote after submission</li>
                <li>Results will be announced after the election period</li>
              </ul>
            </v-alert> -->

            <!-- Action Buttons -->
            <v-card-actions class="justify-center">
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
                color="primary"
                :to="{ name: 'ElectionResults', params: { id: electionId } }"
                :disabled="!showResults"
              >
                <v-icon left>mdi-poll</v-icon>
                View Results
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <vue-confetti v-if="showConfetti" :config="confettiConfig"></vue-confetti>
  </v-container>
</template>

<script>
import VueConfetti from 'vue-confetti'

export default {
  name: 'VoteSuccess',

  components: {
    VueConfetti
  },

  data() {
    return {
      electionDetails: null,
      showConfetti: true,
      loading: false,
      error: null,
      socialSharing: [
        { type: 'facebook', icon: 'mdi-facebook', color: 'blue darken-4' },
        { type: 'twitter', icon: 'mdi-twitter', color: 'light-blue' },
        { type: 'whatsapp', icon: 'mdi-whatsapp', color: 'green' }
      ],
      confettiConfig: {
        angle: 90,
        spread: 100,
        startVelocity: 45,
        elementCount: 70,
        dragFriction: 0.1,
        duration: 3000,
        delay: 0,
        width: "10px",
        height: "10px",
        colors: ["#ff0000", "#00ff00", "#0000ff"]
      }
    }
  },

  computed: {
    electionId() {
      return this.$route.params.id
    },
    showResults() {
      return this.electionDetails?.showResults || false
    }
  },

  methods: {
    async fetchElectionDetails() {
      this.loading = true
      try {
        const response = await this.$http.get(`/election/${this.electionId}`)
        this.electionDetails = response.data
      } catch (error) {
        console.error('Error fetching election details:', error)
        this.error = 'Failed to load election details'
      } finally {
        this.loading = false
      }
    },

    formatDate(date) {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
        timeStyle: 'short'
      }).format(date)
    },

    generateReferenceId() {
      const timestamp = Date.now().toString(36)
      const randomStr = Math.random().toString(36).substring(2, 8)
      return `VOTE-${timestamp}-${randomStr}`.toUpperCase()
    },

    startConfetti() {
      this.$confetti.start()
      setTimeout(() => {
        this.$confetti.stop()
      }, 3000)
    }
  },

  async created() {
    await this.fetchElectionDetails()
  },

  mounted() {
    this.startConfetti()
  },

  beforeDestroy() {
    this.$confetti.stop()
  }
}
</script>

<style scoped>
.success-card {
  background: linear-gradient(to bottom right, #ffffff, #f8f8f8);
  border-radius: 16px;
}

.v-card.success-card {
  transition: all 0.3s ease;
}

.v-card.success-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-card {
  animation: fadeIn 0.5s ease-out;
}
</style>