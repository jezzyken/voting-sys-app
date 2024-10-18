<template>
  <v-app>
    <v-app-bar
      app
      color="transparent"
      elevation="0"
      :class="{ 'v-app-bar--is-scrolled': isScrolled }"
    >
      <v-container class="px-0 pa-0 fill-height">
        <v-avatar color="primary darken-1" size="40" class="mr-3">
          <span class="white--text text-h6">V</span>
        </v-avatar>
        <v-toolbar-title class="text-h5 font-weight-bold"
          >GITVote</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn text @click="scrollTo('home')" class="text-capitalize"
          >Home</v-btn
        >
        <v-btn text @click="scrollTo('candidates')" class="text-capitalize"
          >Candidates</v-btn
        >
        <v-btn text @click="scrollTo('events')" class="text-capitalize"
          >Events</v-btn
        >
        <v-btn
          color="primary darken-1"
          class="ml-4"
          :to="{ path: '/portal/login' }"
        >
          Enter Portal
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="pa-0">
      <section id="home" class="hero-section">
        <v-container fill-height>
          <v-row align="center" justify="center" class="fill-height">
            <v-col cols="12" md="8" class="text-center">
              <h1 class="text-h2 font-weight-bold mb-4 white--text">
                Your Vote, Your Voice
              </h1>
              <p class="text-h5 mb-8 white--text">
                Make informed decisions with VoteRight
              </p>
              <v-btn
                color="primary darken-1"
                x-large
                elevation="2"
                class="px-8"
                :to="{ path: '/portal/login' }"
              >
                Enter Voting Portal
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <v-container>
        <section id="candidates" class="py-16" v-if="candidates != 0">
          <h2 class="text-h3 font-weight-bold mb-6 primary--text">
            Presidential Candidates for {{ electionName }}
          </h2>
          <p class="subtitle-1 mb-4">
            Election period: {{ formatDate(electionStartDate) }} -
            {{ formatDate(electionEndDate) }}
          </p>
          <v-row>
            <v-col
              v-for="candidate in candidates"
              :key="candidate.candidateFullName"
              cols="12"
              md="4"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  class="d-flex flex-column pa-4 transition-swing candidate-card align-center"
                  :elevation="hover ? 8 : 2"
                  :class="{ 'on-hover': hover }"
                >
                  <v-avatar size="100" class="mb-4 align-self-center">
                    <v-img
                      :src="candidate.candidateImageUrl"
                      alt="Candidate Image"
                    ></v-img>
                  </v-avatar>
                  <h3 class="text-h5 font-weight-bold mb-2">
                    {{ candidate.candidateFullName }}
                  </h3>
                  <p class="subtitle-2 grey--text mb-2">
                    {{ candidate.candidateYearLevel }} -
                    {{ candidate.candidateSection }}
                  </p>
                  <p class="body-1 manifesto-preview">
                    {{ truncateManifesto(candidate.candidateManifesto) }}
                  </p>
                  <v-spacer></v-spacer>
                  <v-fade-transition>
                    <v-overlay
                      color="primary"
                      v-if="hover"
                      absolute
                      :opacity="1"
                      class="d-flex flex-column justify-center align-center text-center"
                    >
                      <p class="white--text pa-4">
                        {{ candidate.candidateManifesto }}
                      </p>
                    </v-overlay>
                  </v-fade-transition>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </section>

        <section id="events" class="py-16">
          <h2 class="text-h3 font-weight-bold mb-6 primary--text">
            Upcoming Events
          </h2>
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="event in events"
              :key="event._id"
              color="secondary"
              small
            >
              <template v-slot:opposite>
                <span class="subtitle-1 font-weight-bold">{{
                  formatDate(event.startDate)
                }}</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="text-h6">{{ event.name }}</v-card-title>
                <v-card-text>
                  <p>
                    <v-icon small class="mr-2">mdi-calendar</v-icon>
                    {{ formatDateRange(event.startDate, event.endDate) }}
                  </p>
                  <p v-if="event.location">
                    <v-icon small class="mr-2">mdi-map-marker</v-icon>
                    {{ event.location }}
                  </p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </section>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ selectedCandidate.name }}
        </v-card-title>
        <v-card-text>
          <p><strong>Party:</strong> {{ selectedCandidate.party }}</p>
          <p><strong>Platform:</strong> {{ selectedCandidate.platform }}</p>
          <p>Additional details about the candidate would go here...</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="3000" color="success">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import moment from "moment";
export default {
  data: () => ({
    isScrolled: false,
    electionName: "",
    electionStartDate: null,
    electionEndDate: null,
    candidates: [],
    events: [],
    dialog: false,
    selectedCandidate: {},
    snackbar: false,
    snackbarText: "",
  }),
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.fetchElectionData();
    this.fetchUpcomingEvents();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    scrollTo(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    showCandidateDetails(candidate) {
      this.selectedCandidate = candidate;
      this.dialog = true;
    },
    addToCalendar(event) {
      this.snackbarText = `Added ${event.name} to your calendar`;
      this.snackbar = true;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
    async fetchElectionData() {
      try {
        const response = await this.$http.get("/election/ongoing/candidates");
        const data = await response.data.data.items;
        console.log(data);
        if (data.length > 0) {
          const election = data[0];
          this.electionName = election.electionName;
          this.electionStartDate = election.electionStartDate;
          this.electionEndDate = election.electionEndDate;
          this.candidates = data.map((item) => ({
            candidateFullName: item.candidateFullName,
            candidateManifesto: item.candidateManifesto,
            candidateImageUrl: item.candidateImageUrl,
            candidateYearLevel: item.candidateYearLevel,
            candidateSection: item.candidateSection,
          }));
        }
      } catch (error) {
        console.error("Error fetching election data:", error);
      }
    },
    async fetchUpcomingEvents() {
      try {
        const response = await this.$http.get("/election/upcoming/events");
        const data = response.data.data.items;
        this.events = data;
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    },

    formatDate(date) {
      return moment(date).format("MMMM D, YYYY");
    },
    formatDateRange(startDate, endDate) {
      const start = moment(startDate);
      const end = moment(endDate);

      if (start.year() === end.year()) {
        if (start.month() === end.month()) {
          return `${start.format("MMM D")} - ${end.format("D, YYYY")}`;
        } else {
          return `${start.format("MMM D")} - ${end.format("MMM D, YYYY")}`;
        }
      } else {
        return `${start.format("MMM D, YYYY")} - ${end.format("MMM D, YYYY")}`;
      }
    },
    truncateManifesto(manifesto, length = 100) {
      return manifesto.length > length
        ? manifesto.slice(0, length) + "..."
        : manifesto;
    },
  },
};
</script>

<style scoped>
.v-application {
  font-family: "Roboto", sans-serif;
}
.on-hover {
  transform: translateY(-5px);
}
.hero-section {
  height: 100vh;
  margin-top: -64px;
  padding-top: 64px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://plus.unsplash.com/premium_photo-1708022615102-e82359b68f08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
      no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
}
.v-app-bar {
  transition: background-color 0.3s ease;
}
.v-app-bar--is-scrolled {
  background-color: #fff !important;
}

.v-application .pa-0 {
  padding: 0px !important;
}

.v-application .pa-6 {
  padding: 0px !important;
}

.v-application .py-6 {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}

.candidate-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.manifesto-preview {
  flex-grow: 1;
  overflow: hidden;
}
</style>
