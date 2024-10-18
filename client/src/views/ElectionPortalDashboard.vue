<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="mt-5 text-center">
          <v-card-title class="justify-center display-1 font-weight-bold">
            Welcome to the Student Elections Portal
          </v-card-title>
          <v-card-text>
            <p class="subtitle-1">
              Make your voice heard! Participate in shaping the future of our
              student community.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12" md="4">
        <v-card height="100%">
          <v-card-title class="justify-center">Current Elections</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="election in currentElections"
                :key="election.id"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ election.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    election.dateRange
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn color="primary" @click="goToVoting(election.id)">
                    Vote
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-btn
              color="secondary"
              block
              class="mt-4"
              @click="viewAllElections"
            >
              View All Elections
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%">
          <v-card-title class="justify-center">Election Results</v-card-title>
          <v-card-text class="text-center">
            <v-btn color="secondary" large @click="viewResults">
              View Results
            </v-btn>
            <p class="mt-4">
              Check out the latest results from our recent elections.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card height="100%">
          <v-card-title class="justify-center"
            >Candidate Information</v-card-title
          >
          <v-card-text class="text-center">
            <v-btn color="info" large @click="viewCandidates">
              Meet the Candidates
            </v-btn>
            <p class="mt-4">
              Learn about the candidates running for various positions.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-10">
      <v-col cols="12">
        <v-card>
          <v-card-title>Upcoming Election Timeline</v-card-title>
          <v-card-text>
            <v-timeline dense>
              <v-timeline-item
                v-for="(event, index) in electionTimeline"
                :key="index"
                :color="event.color"
                small
              >
                <template v-slot:opposite>
                  <span>{{ event.date }}</span>
                </template>
                <v-card class="elevation-2">
                  <v-card-title class="text-h6">
                    {{ event.title }}
                  </v-card-title>
                  <v-card-text>{{ event.description }}</v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
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
      currentElections: [
        {
          id: "ssc2024",
          name: "Student Council Election 2024",
          dateRange: "Oct 30 - Nov 5, 2024",
        },
        {
          id: "class2024",
          name: "Classroom Officers Election 2024",
          dateRange: "Nov 7 - Nov 12, 2024",
        },
        {
          id: "clubs2024",
          name: "Club Representatives Election 2024",
          dateRange: "Nov 15 - Nov 20, 2024",
        },
      ],
      electionTimeline: [
        {
          date: "Oct 1, 2024",
          title: "Nominations Open",
          description:
            "Candidates can submit their nominations for various positions.",
          color: "green",
        },
        {
          date: "Oct 15, 2024",
          title: "Nominations Close",
          description: "Last day to submit nominations for the election.",
          color: "red",
        },
        {
          date: "Oct 20-25, 2024",
          title: "Campaign Week",
          description:
            "Candidates campaign and present their ideas to the student body.",
          color: "blue",
        },
        {
          date: "Oct 30, 2024",
          title: "Election Day",
          description:
            "Students cast their votes for their preferred candidates.",
          color: "purple",
        },
        {
          date: "Nov 1, 2024",
          title: "Results Announced",
          description:
            "Election results are officially announced to the student body.",
          color: "orange",
        },
      ],
    };
  },
  methods: {
    goToVoting(electionId) {
      console.log("Navigating to voting page for election:", electionId);
      this.$router.push("/election/portal/candidates");
    },
    viewAllElections() {
      console.log("Navigating to all elections page");
    },
    viewResults() {
      console.log("Navigating to results page");
    },
    viewCandidates() {
      console.log("Navigating to candidates information page");
    },
  },
};
</script>
