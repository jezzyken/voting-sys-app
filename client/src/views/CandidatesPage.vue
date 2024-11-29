<template>
  <div>
    <v-container>
      <!-- Header Section -->
      <v-card class="mb-6 primary" dark>
        <v-card-text class="text-center">
          <h1 class="text-h4 font-weight-bold mb-2">
            MEET THE CANDIDATES
          </h1>
          <p class="subtitle-1 mb-0">View candidates for all elections</p>
        </v-card-text>
      </v-card>

      <v-btn class="mb-6" color="primary" outlined @click="$router.go(-1)">
        <v-icon left>mdi-arrow-left</v-icon>
        Back
      </v-btn>

      <!-- Election Selection -->
      <v-card class="mb-6">
        <v-card-text>
          <!-- View Type Toggle -->
          <v-btn-toggle v-model="viewType" mandatory class="mb-4" color="primary">
            <v-btn value="positions">
              <v-icon left>mdi-account-group</v-icon>
              By Positions
            </v-btn>
            <v-btn value="parties">
              <v-icon left>mdi-flag</v-icon>
              By Parties
            </v-btn>
          </v-btn-toggle>

          <v-select v-model="selectedElectionType" :items="electionTypes" label="Select Election Status" outlined
            @change="fetchElectionsByType"></v-select>

          <v-select v-if="elections.length > 0" v-model="selectedElectionId" :items="elections" item-text="name"
            item-value="_id" label="Select Election" outlined @change="fetchCandidates">
            <template v-slot:selection="{ item }">
              {{ item.name }}
            </template>
            <template v-slot:item="{ item }">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ formatDateRange(item.startDate, item.endDate) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-select>
        </v-card-text>
      </v-card>

      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <!-- Error Alert -->
      <v-alert v-if="error" type="error" dismissible class="mb-4" @input="error = null">
        {{ error }}
      </v-alert>

      <!-- No Candidates Message -->
      <v-card v-if="!loading && candidates.length === 0" class="text-center pa-6">
        <v-icon large color="grey" class="mb-2">mdi-account-question</v-icon>
        <div class="text-h6 grey--text">
          {{
            !selectedElectionType ? 'Please select an election status' :
              !selectedElectionId ? 'Please select an election' :
                'No candidates found for this election'
          }}
        </div>
      </v-card>

      <!-- Candidates By Position -->
      <template v-if="viewType === 'positions' && candidates.length > 0">
        <v-card v-for="(candidateGroup, position) in groupedCandidatesByPosition" :key="position" class="mb-6">
          <v-card-title class="primary--text d-flex align-center">
            <v-icon left color="primary">mdi-account-group</v-icon>
            {{ position.toUpperCase() }}
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col v-for="candidate in candidateGroup" :key="candidate._id" cols="12" sm="6" md="4">
                <v-hover v-slot="{ hover }">
                  <v-card outlined class="candidate-card" :class="{ 'elevation-4': hover }">
                    <v-img :src="candidate.imageUrl" height="200px" class="rounded-circle ma-4" contain>
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>

                    <v-card-title class="justify-center text-h6 text-center">
                      {{ getFullName(candidate.studentId).toUpperCase() }}
                    </v-card-title>

                    <v-card-subtitle class="text-center">
                      {{ candidate.position.toUpperCase() }}
                    </v-card-subtitle>

                    <v-card-text>
                      <v-divider class="mb-3"></v-divider>
                      <div v-if="candidate.partyId" class="text-center mb-3">
                        <v-chip color="primary" small>
                          Party: {{ candidate.partyId.name }}
                        </v-chip>
                      </div>
                      <div class="text-subtitle-1 font-weight-medium mb-2">
                        Campaign Message:
                      </div>
                      <div class="manifesto-preview">
                        {{ candidate.manifesto }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>

      <!-- Candidates By Party -->
      <template v-if="viewType === 'parties' && candidates.length > 0">
        <v-card v-for="(partyGroup, partyName) in groupedCandidatesByParty" :key="partyName" class="mb-6">
          <v-card-title class="primary--text d-flex align-center">
            <v-icon left color="primary">mdi-flag</v-icon>
            {{ partyName || 'Independent Candidates' }}
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col v-for="candidate in partyGroup" :key="candidate._id" cols="12" sm="6" md="4">
                <v-hover v-slot="{ hover }">
                  <v-card outlined class="candidate-card" :class="{ 'elevation-4': hover }">
                    <v-img :src="candidate.imageUrl" height="200px" class="rounded-circle ma-4" contain>
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>

                    <v-card-title class="justify-center text-h6 text-center">
                      {{ getFullName(candidate.studentId).toUpperCase() }}
                    </v-card-title>

                    <v-card-subtitle class="text-center">
                      {{ candidate.position.toUpperCase() }}
                    </v-card-subtitle>

                    <v-card-text>
                      <v-divider class="mb-3"></v-divider>
                      <div v-if="candidate.partyId" class="text-center mb-3">
                        <v-chip color="primary" small>
                          Party: {{ candidate.partyId.name }}
                        </v-chip>
                      </div>
                      <div class="text-subtitle-1 font-weight-medium mb-2">
                        Campaign Message:
                      </div>
                      <div class="manifesto-preview">
                        {{ candidate.manifesto }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>

    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewType: 'positions',
      candidates: [],
      elections: [],
      selectedElectionId: null,
      selectedElectionType: null,
      electionTypes: [
        { text: 'Ongoing Elections', value: 'ongoing' },
        { text: 'Upcoming Elections', value: 'upcoming' },
        { text: 'Completed Elections', value: 'completed' }
      ],
      loading: false,
      error: null,
    };
  },

  computed: {
    groupedCandidatesByPosition() {
      return this.candidates.reduce((acc, candidate) => {
        if (!acc[candidate.position]) {
          acc[candidate.position] = [];
        }
        acc[candidate.position].push(candidate);
        return acc;
      }, {});
    },

    groupedCandidatesByParty() {
      return this.candidates.reduce((acc, candidate) => {
        const partyName = candidate.partyId?.name || 'Independent';
        if (!acc[partyName]) {
          acc[partyName] = [];
        }
        acc[partyName].push(candidate);
        return acc;
      }, {});
    }
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

    async fetchElectionsByType() {
      if (!this.selectedElectionType) return;

      this.loading = true;
      this.selectedElectionId = null;
      this.candidates = [];

      try {
        const response = await this.$http.get(
          `/election/${this.selectedElectionType}/events`
        );
        this.elections = response.data;
      } catch (error) {
        console.error("Error fetching elections:", error);
        this.error = "Failed to load elections list";
      } finally {
        this.loading = false;
      }
    },

    async fetchCandidates() {
      if (!this.selectedElectionId) {
        this.candidates = [];
        return;
      }

      this.loading = true;
      try {
        const response = await this.$http.get(
          `/candidate/ongoing/election/${this.selectedElectionId}`
        );
        this.candidates = response.data;
        console.log(this.candidates)
      } catch (error) {
        console.error("Error fetching candidates:", error);
        this.error = "Failed to load candidates. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    getFullName(student) {
      if (!student) return "";
      return `${student.firstName} ${student.middleName} ${student.lastName}`;
    },
  },
};
</script>

<style scoped>
.candidate-card {
  transition: all 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.candidate-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.candidate-card .v-card__title {
  word-break: break-word;
  line-height: 1.2;
}

.manifesto-preview {
  max-height: 150px;