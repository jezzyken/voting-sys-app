<template>
  <v-container fluid>
    <v-card elevation="2" class="report-card">
      <!-- Header Section -->
      <v-card-title class="report-header pa-6">
        <div class="d-flex flex-wrap justify-space-between align-center w-100">
          <div class="text-h4 primary--text font-weight-bold">
            Voting Status Report
          </div>
          <div class="d-flex align-center">
            <v-select
              v-model="selectedElection"
              :items="elections"
              item-text="name"
              item-value="_id"
              label="Select Election"
              outlined
              dense
              hide-details
              class="election-select mr-4"
              :loading="!elections.length"
              @change="generateReport"
            >
              <template v-slot:prepend>
                <v-icon color="primary">mdi-vote</v-icon>
              </template>
            </v-select>

            <v-btn
              color="primary"
              @click="exportToExcel"
              :disabled="!reportData.length"
              elevation="2"
              class="export-button align-self-end"
            >
              <v-icon left>mdi-microsoft-excel</v-icon>
              Export to Excel
              <v-fade-transition>
                <v-overlay
                  absolute
                  opacity="0.2"
                  v-if="!reportData.length"
                  class="export-overlay"
                ></v-overlay>
              </v-fade-transition>
            </v-btn>
          </div>
        </div>
      </v-card-title>

      <v-card-text class="pa-6">
        <!-- Summary Cards -->
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-card outlined class="summary-card primary">
              <v-card-text class="text-center py-6">
                <div class="text-subtitle-1 white--text mb-2">
                  Total Students
                </div>
                <div class="text-h3 white--text font-weight-bold">
                  {{ summary.totalStudents }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card outlined class="summary-card success">
              <v-card-text class="text-center py-6">
                <div class="text-subtitle-1 white--text mb-2">Voted</div>
                <div class="text-h3 white--text font-weight-bold">
                  {{ summary.voted }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card outlined class="summary-card error">
              <v-card-text class="text-center py-6">
                <div class="text-subtitle-1 white--text mb-2">Not Voted</div>
                <div class="text-h3 white--text font-weight-bold">
                  {{ summary.notVoted }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card outlined class="summary-card info">
              <v-card-text class="text-center py-6">
                <div class="text-subtitle-1 white--text mb-2">
                  Voting Progress
                </div>
                <div class="text-h3 white--text font-weight-bold">
                  {{ summary.votingPercentage }}%
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Data Table Section -->
        <v-card outlined class="mt-6">
          <v-card-title>
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search Students"
              single-line
              hide-details
              filled
              rounded
              dense
              class="table-search"
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="reportData"
            :search="search"
            :loading="loading"
            :items-per-page="10"
            :footer-props="{
              'items-per-page-options': [10, 25, 50, 100],
              'show-current-page': true,
              'show-first-last-page': true,
            }"
            class="elevation-0"
          >
            <template v-slot:item.hasVoted="{ item }">
              <v-chip
                :color="item.hasVoted ? 'success' : 'error'"
                small
                label
                class="font-weight-medium"
              >
                <v-icon left small>
                  {{ item.hasVoted ? "mdi-check" : "mdi-close" }}
                </v-icon>
                {{ item.hasVoted ? "Voted" : "Not Voted" }}
              </v-chip>
            </template>

            <template v-slot:progress>
              <v-progress-linear
                indeterminate
                color="primary"
              ></v-progress-linear>
            </template>
          </v-data-table>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "VotingReport",

  data: () => ({
    selectedElection: null,
    elections: [],
    reportData: [],
    loading: false,
    search: "",
    summary: {
      totalStudents: 0,
      voted: 0,
      notVoted: 0,
      votingPercentage: 0,
    },
    headers: [
      { text: "Student No.", value: "studentNo" },
      { text: "First Name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "Program", value: "program" },
      { text: "Year Level", value: "yearLevel" },
      { text: "Voting Status", value: "hasVoted" },
    ],
  }),

  async created() {
    await this.fetchElections();
  },

  methods: {
    async fetchElections() {
      try {
        const response = await this.$http.get("/election");
        console.log(response);
        this.elections = response.data.data.items;
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    },

    async generateReport() {
      if (!this.selectedElection) return;
      this.loading = true;
      try {
        const response = await this.$http.get(
          `/report/voting-status/${this.selectedElection}`
        );

        console.log(response);
        this.reportData = response.data.data;
        this.summary = response.data.summary;
      } catch (error) {
        console.error("Error generating report:", error);
      } finally {
        this.loading = false;
      }
    },

    exportToExcel() {
      const data = this.reportData.map((item) => ({
        "Student No.": item.studentNo,
        "First Name": item.firstName,
        "Last Name": item.lastName,
        Program: item.program,
        "Year Level": item.yearLevel,
        "Voting Status": item.hasVoted ? "Voted" : "Not Voted",
      }));

      const csvContent = this.convertToCSV(data);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `voting_report_${new Date().toISOString()}.csv`;
      link.click();
    },

    convertToCSV(data) {
      const headers = Object.keys(data[0]);
      const csvRows = [];
      csvRows.push(headers.join(","));

      for (const row of data) {
        const values = headers.map((header) => {
          const value = row[header];
          return `"${value}"`;
        });
        csvRows.push(values.join(","));
      }

      return csvRows.join("\n");
    },
  },
};
</script>
<style scoped>
.report-card {
  border-radius: 8px;
}

.report-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.election-select {
  max-width: 300px;
}

.summary-card {
  transition: transform 0.2s;
}

.summary-card:hover {
  transform: translateY(-4px);
}

.table-search {
  max-width: 300px;
}

/* Add these styles to your theme or global CSS */
.v-data-table >>> thead th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
}

.v-data-table >>> tbody td {
  font-size: 0.875rem;
}

.export-button {
  white-space: nowrap;
}

.election-select {
  max-width: 300px;
}

/* Add these to your existing styles */
@media (max-width: 959px) {
  .d-flex.align-center {
    flex-direction: column;
    align-items: stretch !important;
    width: 100%;
  }

  .election-select {
    margin-bottom: 1rem;
    max-width: 100%;
  }

  .export-button {
    width: 100%;
  }
}
</style>
