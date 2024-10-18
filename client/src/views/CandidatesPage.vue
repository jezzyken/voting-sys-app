<template>
  <div>
    <v-container>
      <h1 class="text-h4 font-weight-bold text-center mb-6 primary--text">YOU MAY NOW CAST YOUR VOTES!</h1>
      
      <v-card v-for="(candidateGroup, position) in groupedCandidates" :key="position" class="mb-6 pa-4">
        <h2 class="text-h5 mb-2">{{ position.toUpperCase() }} Student Council</h2>
        <p class="text-caption mb-4">You can only vote for one candidate per position</p>
        <v-row>
          <v-col cols="12" sm="4" v-for="candidate in candidateGroup" :key="candidate._id">
            <v-card outlined class="candidate-card" :class="{ 'selected': isSelected(candidate) }">
              <v-img :src="candidate.imageUrl" height="200px" class="rounded-circle ma-4" contain></v-img>
              <v-card-title class="justify-center text-h6">{{ getFullName(candidate.studentId).toUpperCase() }}</v-card-title>
              <v-card-subtitle class="text-center pb-0">{{ candidate.position.toUpperCase() }}</v-card-subtitle>
              <v-card-actions class="justify-center pb-4">
                <v-btn 
                  :color="isSelected(candidate) ? 'success' : 'primary'" 
                  rounded 
                  @click="selectCandidate(candidate)"
                >
                  {{ isSelected(candidate) ? 'SELECTED' : 'SELECT' }}
                </v-btn>
                <v-btn text color="primary" class="ml-2" @click="viewDetails(candidate)">View Details</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      <v-btn color="primary" x-large block class="mt-6" @click="showSummary">SUBMIT VOTE</v-btn>
    </v-container>

    <v-dialog v-model="summaryDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Vote Summary</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(candidate, position) in selectedCandidates" :key="position">
              <v-list-item-content>
                <v-list-item-title>{{ position.toUpperCase() }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ getFullName(candidate.studentId).toUpperCase() }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="summaryDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="confirmVote">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      candidates: [],
      selectedCandidates: {},
      summaryDialog: false,
    }
  },
  computed: {
    groupedCandidates() {
      return this.candidates.reduce((acc, candidate) => {
        if (!acc[candidate.position]) {
          acc[candidate.position] = [];
        }
        acc[candidate.position].push(candidate);
        return acc;
      }, {});
    }
  },
  methods: {
    async fetchCandidates() {
      try {
        const response = await axios.get('/candidate');
        this.candidates = response.data.data.items;
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    },
    getFullName(student) {
      return `${student.firstName} ${student.middleName} ${student.lastName}`;
    },
    selectCandidate(candidate) {
      if (this.isSelected(candidate)) {
        this.$delete(this.selectedCandidates, candidate.position);
      } else {
        this.$set(this.selectedCandidates, candidate.position, candidate);
      }
    },
    isSelected(candidate) {
      return this.selectedCandidates[candidate.position]?._id === candidate._id;
    },
    viewDetails(candidate) {
      console.log('View details for:', candidate);
    },
    showSummary() {
      this.summaryDialog = true;
    },
    confirmVote() {
      const voteData = Object.entries(this.selectedCandidates).reduce((acc, [position, candidate]) => {
        acc[position.toLowerCase()] = {
          candidateId: candidate._id,
          studentId: candidate.studentId._id,
          position: candidate.position.toLowerCase()
        };
        return acc;
      }, {});

      console.log('Submitting votes:', voteData);
      this.summaryDialog = false;
    }
  },
  mounted() {
    this.fetchCandidates();
  }
}
</script>

<style scoped>
.candidate-card {
  transition: all 0.3s;
}

.candidate-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.candidate-card.selected {
  border: 2px solid #4CAF50;
}
</style>