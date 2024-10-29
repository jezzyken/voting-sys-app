<template>
  <div>
    <v-container>
      <!-- Header Section -->
      <v-card class="mb-6 primary" dark>
        <v-card-text class="text-center">
          <h1 class="text-h4 font-weight-bold mb-2">YOU MAY NOW CAST YOUR VOTES!</h1>
          <p class="subtitle-1 mb-0">
            Election: {{ electionName }}
          </p>
          <v-chip small class="mt-2" color="white" text-color="primary">
            Election ID: {{ electionId }}
          </v-chip>
        </v-card-text>
      </v-card>

      <!-- Progress Section -->
      <v-card class="mb-6" outlined>
        <v-card-text>
          <div class="d-flex justify-space-between align-center mb-2">
            <span class="subtitle-1">Voting Progress</span>
            <v-chip :color="isVoteComplete ? 'success' : 'warning'">
              {{ votingProgressText }}
            </v-chip>
          </div>
          <v-progress-linear
            :value="votingProgress"
            :color="isVoteComplete ? 'success' : 'primary'"
            height="20"
          >
            <template v-slot:default="{ value }">
              <strong>{{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>
        </v-card-text>
      </v-card>

      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <!-- Error Alert -->
      <v-alert
        v-if="error"
        type="error"
        dismissible
        class="mb-4"
        @input="error = null"
      >
        {{ error }}
      </v-alert>

      <!-- No Candidates Message -->
      <v-card v-if="!loading && candidates.length === 0" class="text-center pa-6">
        <v-icon large color="grey" class="mb-2">mdi-account-question</v-icon>
        <div class="text-h6 grey--text">No candidates found for this election</div>
      </v-card>

      <template v-else>
        <!-- Position Cards -->
        <v-card
          v-for="(candidateGroup, position) in groupedCandidates"
          :key="position"
          class="mb-6"
        >
          <v-card-title class="primary--text d-flex align-center">
            <v-icon left color="primary">mdi-account-group</v-icon>
            {{ position.toUpperCase() }}
            <v-spacer></v-spacer>
            <v-chip
              small
              :color="hasVoteForPosition(position) ? 'success' : 'warning'"
            >
              {{ hasVoteForPosition(position) ? "Selected" : "Not Selected" }}
            </v-chip>
          </v-card-title>

          <v-card-subtitle>Select one candidate for this position</v-card-subtitle>

          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-for="candidate in candidateGroup"
                :key="candidate._id"
              >
                <v-hover v-slot="{ hover }">
                  <v-card
                    outlined
                    class="candidate-card"
                    :class="{
                      selected: isSelected(candidate),
                      'elevation-4': hover,
                    }"
                  >
                    <v-img
                      :src="candidate.imageUrl"
                      height="200px"
                      class="rounded-circle ma-4"
                      contain
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate></v-progress-circular>
                        </v-row>
                      </template>
                      <!-- <v-overlay
                        absolute
                        :value="isSelected(candidate)"
                        class="d-flex align-center justify-center"
                      >
                        <v-icon x-large color="success">mdi-check-circle</v-icon>
                      </v-overlay> -->
                    </v-img>

                    <v-card-title class="justify-center text-h6 text-center">
                      {{ getFullName(candidate.studentId).toUpperCase() }}
                    </v-card-title>

                    <v-card-subtitle class="text-center pb-0">
                      {{ candidate.position.toUpperCase() }}
                    </v-card-subtitle>

                    <v-card-text class="text-center pb-0">
                      <v-btn text color="primary" @click="showManifesto(candidate)">
                        <v-icon left>mdi-file-document-outline</v-icon>
                        View Manifesto
                      </v-btn>
                    </v-card-text>

                    <v-card-actions class="justify-center pa-4">
                      <v-btn
                        :color="isSelected(candidate) ? 'success' : 'primary'"
                        :outlined="!isSelected(candidate)"
                        rounded
                        @click="selectCandidate(candidate)"
                      >
                        <v-icon left>
                          {{ isSelected(candidate) ? "mdi-check" : "mdi-vote" }}
                        </v-icon>
                        {{ isSelected(candidate) ? "SELECTED" : "SELECT" }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Submit Button -->
        <v-card outlined class="mb-6">
          <v-card-text class="text-center">
            <v-btn
              color="primary"
              x-large
              :disabled="!isVoteComplete"
              @click="showSummary"
              class="px-8"
            >
              <v-icon left>mdi-send</v-icon>
              SUBMIT VOTE
            </v-btn>
            <div class="mt-2 grey--text">
              {{ submitButtonMessage }}
            </div>
          </v-card-text>
        </v-card>
      </template>
    </v-container>

    <!-- Manifesto Dialog -->
    <v-dialog v-model="manifestoDialog" max-width="600px">
      <v-card>
        <v-card-title class="primary white--text">
          Candidate Manifesto
          <v-spacer></v-spacer>
          <v-btn icon dark @click="manifestoDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pt-4">
          <div v-if="selectedManifestoCandidate" class="text-center mb-4">
            <v-avatar size="100">
              <v-img :src="selectedManifestoCandidate.imageUrl"></v-img>
            </v-avatar>
            <h3 class="mt-2">
              {{ getFullName(selectedManifestoCandidate.studentId) }}
            </h3>
            <v-chip small>{{ selectedManifestoCandidate.position }}</v-chip>
          </div>
          <div class="manifesto-content mt-4">
            {{ selectedManifestoCandidate?.manifesto }}
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Vote Summary Dialog -->
    <v-dialog v-model="summaryDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="primary white--text">
          Confirm Your Votes
        </v-card-title>
        <v-card-text class="pt-4">
          <p>Please review your selections carefully:</p>
          <v-list>
            <v-list-item
              v-for="(candidate, position) in selectedCandidates"
              :key="position"
            >
              <v-list-item-avatar>
                <v-img :src="candidate.imageUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ position.toUpperCase() }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ getFullName(candidate.studentId).toUpperCase() }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-alert
            type="warning"
            outlined
            dense
            class="mt-4"
          >
            Your vote cannot be changed once submitted.
          </v-alert>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="summaryDialog = false"
            :disabled="submitting"
          >
            Review Again
          </v-btn>
          <v-btn
            color="primary"
            @click="confirmVote"
            :loading="submitting"
            :disabled="submitting"
          >
            <v-icon left>mdi-check</v-icon>
            Confirm Vote
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
 data() {
   return {
     candidates: [],
     selectedCandidates: {},
     summaryDialog: false,
     manifestoDialog: false,
     selectedManifestoCandidate: null,
     loading: false,
     submitting: false,
     error: null,
     electionName: '', // Added for election name
     electionDetails: null // Added for election details
   };
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
   },

   totalPositions() {
     return Object.keys(this.groupedCandidates).length;
   },

   selectedPositionsCount() {
     return Object.keys(this.selectedCandidates).length;
   },

   votingProgress() {
     if (this.totalPositions === 0) return 0;
     return (this.selectedPositionsCount / this.totalPositions) * 100;
   },

   isVoteComplete() {
     return this.totalPositions > 0 && this.selectedPositionsCount === this.totalPositions;
   },

   votingProgressText() {
     if (this.isVoteComplete) {
       return 'All positions selected';
     }
     const remaining = this.totalPositions - this.selectedPositionsCount;
     return `${remaining} position${remaining === 1 ? '' : 's'} remaining`;
   },

   submitButtonMessage() {
     if (this.isVoteComplete) {
       return 'Click to submit your vote';
     }
     return `Please select candidates for all positions before submitting`;
   },

   electionId() {
     return this.$route.params.id;
   }
 },

 methods: {
   async fetchElectionDetails() {
     try {
       const response = await this.$http.get(`/election/${this.electionId}`);
       this.electionDetails = response.data;
       this.electionName = response.data.name;
     } catch (error) {
       console.error('Error fetching election details:', error);
       this.error = 'Failed to load election details';
     }
   },

   async fetchCandidates() {
     this.loading = true;
     this.error = null;
     try {
       const response = await this.$http.get(
         `/candidate/ongoing/election/${this.electionId}`
       );
       this.candidates = response.data;
     } catch (error) {
       console.error('Error fetching candidates:', error);
       this.error = 'Failed to load candidates. Please try again later.';
     } finally {
       this.loading = false;
     }
   },

   async checkVoteStatus() {
     try {

      const studentId = localStorage.getItem("studentId");

       const response = await this.$http.get(
         `/vote/check/${this.electionId}/${studentId}`
       );
       if (response.data.hasVoted) {
         this.$router.push({
           name: 'AlreadyVoted',
           params: { id: this.electionId }
         });
       }
     } catch (error) {
       console.error('Error checking vote status:', error);
       this.error = 'Failed to check voting status';
     }
   },

   getFullName(student) {
     if (!student) return '';
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

   hasVoteForPosition(position) {
     return !!this.selectedCandidates[position];
   },

   showManifesto(candidate) {
     this.selectedManifestoCandidate = candidate;
     this.manifestoDialog = true;
   },

   showSummary() {
     if (this.isVoteComplete) {
       this.summaryDialog = true;
     }
   },

   async confirmVote() {
     this.submitting = true;
     try {
       const voteData = {
         electionId: this.electionId,
         studentId: localStorage.getItem("studentId"),
         votes: Object.values(this.selectedCandidates).map((candidate) => ({
           candidateId: candidate._id,
           position: candidate.position,
         })),
       };

       await this.$http.post('/vote', voteData);
       
       this.$store.commit('setSnackbar', {
         show: true,
         message: 'Your vote has been successfully submitted!',
         color: 'success'
       });

       this.$router.push({
         name: 'VoteSuccess',
         params: { id: this.electionId },
       });
     } catch (error) {
       console.error('Error submitting votes:', error);
       this.error = error.response?.data?.message || 'Failed to submit votes. Please try again.';
       this.summaryDialog = false;
     } finally {
       this.submitting = false;
     }
   },

   handleBeforeUnload(e) {
     if (this.selectedPositionsCount > 0 && !this.submitting) {
       e.preventDefault();
       e.returnValue = '';
     }
   }
 },

 async created() {
   if (!this.electionId) {
     this.error = 'No election ID provided';
     return;
   }
   
   await Promise.all([
     this.fetchElectionDetails(),
     this.checkVoteStatus()
   ]);
   
   await this.fetchCandidates();
 },

 mounted() {
   window.addEventListener('beforeunload', this.handleBeforeUnload);
 },

 beforeDestroy() {
   window.removeEventListener('beforeunload', this.handleBeforeUnload);
 }
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

.candidate-card.selected {
 border: 2px solid #4caf50;
}

.candidate-card .v-card__title {
 word-break: break-word;
 line-height: 1.2;
}

.candidate-card .v-card__actions {
 margin-top: auto;
}

.manifesto-content {
 white-space: pre-wrap;
 line-height: 1.6;
 font-size: 1.1em;
 padding: 16px;
 background: #f5f5f5;
 border-radius: 4px;
}

.v-progress-linear {
 border-radius: 4px;
}

.position-chip {
 position: absolute;
 top: 8px;
 right: 8px;
}

/* Animation for selected state */
.selected-overlay-enter-active,
.selected-overlay-leave-active {
 transition: opacity 0.3s ease;
}

.selected-overlay-enter,
.selected-overlay-leave-to {
 opacity: 0;
}
</style>
