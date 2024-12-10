<template>
  <v-container fluid>
    <v-row>
      <!-- Elections List Card -->
      <v-col cols="12" md="3">
        <v-card elevation="2" class="election-list-card">
          <v-card-title class="primary--text d-flex align-center">
            <v-icon left color="primary">mdi-ballot</v-icon>
            Elections
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text class="pa-0">
            <v-list dense>
              <v-list-item-group v-model="selectedElection">
                <v-list-item v-for="election in elections" :key="election._id" :value="election._id"
                  @click="generateReport(election._id)">
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium">
                      {{ election.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-caption">
                      {{ formatDate(election.startDate) }} -
                      {{ formatDate(election.endDate) }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-chip x-small :color="getStatusColor(election.status)" dark>
                      {{ election.status.toUpperCase() }}
                    </v-chip>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Report Content -->
      <v-col cols="12" md="9">
        <v-card elevation="2" class="report-card">
          <v-card-title class="report-header pa-4">
            <div class="d-flex flex-wrap justify-space-between align-center w-100">
              <div class="text-body-1 font-weight-bold mr-2">
                Voting Status Report
              </div>
              <div class="d-flex align-center">
                <v-btn color="primary" @click="exportToExcel" :disabled="!reportData.length" small class="mr-2">
                  <v-icon left small>mdi-microsoft-excel</v-icon>
                  Export CSV
                </v-btn>

                <v-btn color="secondary" @click="downloadResults" :disabled="!selectedElection || !isElectionCompleted"
                  small>
                  <v-icon left small>mdi-file-pdf-box</v-icon>
                  Download Results
                </v-btn>
              </div>
            </div>
          </v-card-title>

          <v-card-text class="pa-4">
            <!-- Summary Cards -->
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-card outlined class="summary-card primary">
                  <v-card-text class="text-center py-4">
                    <div class="text-caption white--text mb-1">
                      Total Students
                    </div>
                    <div class="text-h5 white--text font-weight-bold">
                      {{ summary.totalStudents }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card outlined class="summary-card success">
                  <v-card-text class="text-center py-4">
                    <div class="text-caption white--text mb-1">Voted</div>
                    <div class="text-h5 white--text font-weight-bold">
                      {{ summary.voted }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card outlined class="summary-card error">
                  <v-card-text class="text-center py-4">
                    <div class="text-caption white--text mb-1">Not Voted</div>
                    <div class="text-h5 white--text font-weight-bold">
                      {{ summary.notVoted }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-card outlined class="summary-card teal darken-1">
                  <v-card-text class="text-center py-4">
                    <div class="text-caption white--text mb-1">
                      Voting Progress
                    </div>
                    <div class="text-h5 white--text font-weight-bold">
                      {{ summary.votingPercentage }}%
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Data Table -->
            <v-card outlined class="mt-4">
              <v-card-title class="py-2">
                <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="Search Students" single-line
                  hide-details filled rounded dense class="table-search"></v-text-field>
              </v-card-title>

              <v-data-table :headers="headers" :items="reportData" :search="search" :loading="loading"
                :items-per-page="10" :footer-props="{
                  'items-per-page-options': [10, 25, 50, 100],
                  'show-current-page': true,
                  'show-first-last-page': true,
                }" dense class="elevation-0">
                <template v-slot:item.hasVoted="{ item }">
                  <v-chip :color="item.hasVoted ? 'success' : 'error'" x-small dark class="font-weight-medium">
                    <v-icon left x-small>
                      {{ item.hasVoted ? "mdi-check" : "mdi-close" }}
                    </v-icon>
                    {{ item.hasVoted ? "Voted" : "Not Voted" }}
                  </v-chip>
                </template>

                <template v-slot:progress>
                  <v-progress-linear indeterminate color="primary"></v-progress-linear>
                </template>

                <template v-slot:no-data>
                  <div class="text-center py-6">
                    <v-icon large color="grey lighten-1">mdi-ballot-outline</v-icon>
                    <div class="text-subtitle-1 grey--text mt-2">
                      No voting data available
                    </div>
                  </div>
                </template>
              </v-data-table>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="4000" top>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
      { text: "Student No.", value: "studentNo", width: "120px" },
      { text: "First Name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "Program", value: "program" },
      { text: "Year Level", value: "yearLevel", width: "100px" },
      { text: "Voting Status", value: "hasVoted", width: "120px" },
    ],
    snackbar: {
      show: false,
      text: "",
      color: "info",
    },
    currentElectionStatus: null,
  }),

  computed: {
    isElectionCompleted() {
      return this.currentElectionStatus === "completed";
    },
  },

  async created() {
    await this.fetchElections();
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    getStatusColor(status) {
      const colors = {
        upcoming: "info",
        ongoing: "warning",
        completed: "success",
      };
      return colors[status] || "grey";
    },

    async fetchElections() {
      try {
        const response = await this.$http.get("/election");
        this.elections = response.data.data.items;
      } catch (error) {
        console.error("Error fetching elections:", error);
        this.showSnackbar("Failed to fetch elections", "error");
      }
    },

    async generateReport(electionId) {
      if (!electionId) return;
      this.loading = true;

      try {
        const currentElection = this.elections.find(
          (e) => e._id === electionId
        );
        this.currentElectionStatus = currentElection?.status;

        const response = await this.$http.get(
          `/report/voting-status/${electionId}`
        );

        this.reportData = response.data.data;
        this.summary = response.data.summary;
      } catch (error) {
        console.error("Error generating report:", error);
        this.showSnackbar("Failed to generate report", "error");
      } finally {
        this.loading = false;
      }
    },

    async downloadResults() {
      if (!this.selectedElection) return;

      try {
        const response = await this.$http.get(
          `/vote/results/${this.selectedElection}/pdf`,
          { responseType: "blob" }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        // Open in new tab
        window.open(url, "_blank");

        // Or download directly
        const link = document.createElement("a");
        link.href = url;
        link.download = `election-results-${this.selectedElection}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        this.showSnackbar("PDF generated successfully", "success");
      } catch (error) {
        console.error("PDF generation error:", error);
        this.showSnackbar("Failed to generate PDF", "error");
      }
    },

    exportToExcel() {
      if (!this.reportData.length) return;

      try {
        const data = this.reportData.map((item) => ({
          "Student No.": item.studentNo,
          "First Name": item.firstName,
          "Last Name": item.lastName,
          Program: item.program,
          "Year Level": item.yearLevel,
          "Voting Status": item.hasVoted ? "Voted" : "Not Voted",
        }));

        const csvContent = this.convertToCSV(data);
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `voting_report_${new Date().toISOString()}.csv`;
        link.click();
        URL.revokeObjectURL(url);

        this.showSnackbar("Report exported successfully", "success");
      } catch (error) {
        console.error("Export error:", error);
        this.showSnackbar("Failed to export report", "error");
      }
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

    showSnackbar(text, color) {
      this.snackbar = {
        show: true,
        text,
        color,
      };
    },
  },
};
</script>

<style scoped>
.election-list-card {
  height: 100%;
  overflow: auto;
  max-height: calc(100vh - 100px);
}

.report-card {
  border-radius: 8px;
}

.report-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.summary-card {
  transition: transform 0.2s;
  border-radius: 8px;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.table-search {
  max-width: 300px;
}

/* Data table styles */
:deep(.v-data-table) {
  border-radius: 8px;
}

:deep(.v-data-table thead th) {
  font-weight: 600 !important;
  text-transform: uppercase;
  font-size: 0.75rem !important;
  background-color: #f5f5f5;
}

:deep(.v-data-table tbody td) {
  font-size: 0.875rem;
}

/* List styles */
:deep(.v-list-item) {
  min-height: 64px !important;
  cursor: pointer;
}

:deep(.v-list-item--active) {
  background-color: #f5f5f5 !important;
}

:deep(.v-list-item:hover) {
  background-color: #fafafa;
}

/* Responsive styles */
@media (max-width: 959px) {
  .election-list-card {
    max-height: 400px;
    margin-bottom: 16px;
  }

  .d-flex.align-center {
    flex-direction: column;
    align-items: stretch !important;
    width: 100%;
  }

  .table-search {
    max-width: 100%;
  }

  .summary-card {
    margin-bottom: 16px;
  }
}

/* Print styles */
@media print {

  .election-list-card,
  .report-header button,
  .table-search,
  .v-data-footer {
    display: none !important;
  }

  .v-main {
    padding: 0 !important;
  }

  .v-card {
    box-shadow: none !important;
  }
}
</style>
