<template>
  <v-container>
    <!-- Header Section -->
    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="10">
        <v-card class="primary" dark>
          <v-card-text class="text-center py-4">
            <h1 class="text-h4 font-weight-bold mb-2">Election Results</h1>
            <p class="subtitle-1 mb-0">
              {{ electionDetails?.name || "Student Election" }}
            </p>
            <div class="mt-2">
              <v-chip small color="white" text-color="primary" class="mr-2">
                Total Votes: {{ totalVotes }}
              </v-chip>
              <v-chip small :color="getStatusColor(electionDetails?.status)">
                {{ electionDetails?.status?.toUpperCase() || "N/A" }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Loading State -->
    <v-row
      v-if="loading"
      justify="center"
      align="center"
      style="min-height: 400px"
    >
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          size="64"
          color="primary"
        ></v-progress-circular>
        <div class="mt-4 text-subtitle-1">Loading Results...</div>
      </v-col>
    </v-row>

    <!-- Error State -->
    <v-alert v-else-if="error" type="error" class="mb-4">
      {{ error }}
      <template v-slot:append>
        <v-btn text small color="error" @click="fetchResults"> Retry </v-btn>
      </template>
    </v-alert>

    <!-- No Results State -->
    <v-row
      v-else-if="!hasResults"
      justify="center"
      align="center"
      style="min-height: 400px"
    >
      <v-col cols="12" md="6" class="text-center">
        <v-card outlined>
          <v-card-text>
            <v-icon size="64" color="grey lighten-1"
              >mdi-poll-box-outline</v-icon
            >
            <h3 class="text-h6 grey--text text--darken-1 mt-4">
              No Results Available
            </h3>
            <p class="grey--text">
              Results will be displayed once the election is completed.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Results Content -->
    <template v-else>
      <v-row v-for="(candidates, position) in results" :key="position">
        <v-col cols="12">
          <v-card class="mb-6">
            <v-card-title class="primary--text">
              <v-icon left color="primary">mdi-account-group</v-icon>
              {{ position.toUpperCase() }}
              <v-spacer></v-spacer>
              <v-chip
                small
                :color="getWinnerChipColor(candidates)"
                class="ml-2"
              >
                {{ getWinnerChipText(candidates) }}
              </v-chip>
            </v-card-title>

            <v-card-text class="pt-4">
              <!-- Winner Banner -->
              <v-alert
                v-if="getWinner(candidates)"
                color="success"
                outlined
                dense
                class="mb-4"
              >
                <v-row align="center" no-gutters>
                  <v-col cols="auto" class="mr-3">
                    <v-avatar size="48">
                      <v-img :src="getWinner(candidates).imageUrl">
                        <template v-slot:placeholder>
                          <v-avatar color="grey lighten-4" size="48">
                            <v-icon>mdi-account</v-icon>
                          </v-avatar>
                        </template>
                      </v-img>
                    </v-avatar>
                  </v-col>
                  <v-col>
                    <div class="font-weight-bold">
                      {{ getWinner(candidates).studentName }}
                    </div>
                    <div class="text-caption">
                      Received {{ getWinner(candidates).votes }} votes ({{
                        calculatePercentage(getWinner(candidates).votes)
                      }}%)
                    </div>
                  </v-col>
                </v-row>
              </v-alert>

              <!-- Chart -->
              <div class="chart-container mb-6">
                <bar-chart
                  :chart-data="getChartData(candidates)"
                  :options="chartOptions"
                  :height="250"
                />
              </div>

              <!-- Results Table -->
              <v-data-table
                :headers="tableHeaders"
                :items="getTableItems(candidates)"
                hide-default-footer
                class="elevation-1"
              >
                <template v-slot:item.rank="{ item }">
                  <v-chip x-small :color="getRankColor(item.rank)" dark>
                    {{ item.rank }}
                  </v-chip>
                </template>

                <template v-slot:item.candidate="{ item }">
                  <v-avatar size="32" class="mr-2">
                    <v-img :src="item.imageUrl">
                      <template v-slot:placeholder>
                        <v-avatar color="grey lighten-4" size="32">
                          <v-icon small>mdi-account</v-icon>
                        </v-avatar>
                      </template>
                    </v-img>
                  </v-avatar>
                  {{ item.studentName }}
                </template>

                <template v-slot:item.percentage="{ item }">
                  <v-progress-linear
                    :value="item.percentage"
                    height="20"
                    :color="getProgressColor(item.rank)"
                  >
                    <template v-slot:default> {{ item.percentage }}% </template>
                  </v-progress-linear>
                </template>
              </v-data-table>
              <v-expansion-panels class="mt-4">
                <v-expansion-panel>
                  <v-expansion-panel-header class="primary--text">
                    <v-icon left>mdi-chart-box</v-icon>
                    Demographics Breakdown
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-tabs
                      v-model="activeTab"
                      background-color="transparent"
                      color="primary"
                    >
                      <v-tab>
                        <v-icon left>mdi-school</v-icon>
                        By Course
                      </v-tab>
                      <v-tab>
                        <v-icon left>mdi-account-group</v-icon>
                        By Year Level
                      </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="activeTab">
                      <v-tab-item>
                        <v-card flat>
                          <v-card-text>
                            <div
                              v-for="candidate in getTableItems(candidates)"
                              :key="candidate.studentName"
                            >
                              <h3 class="subtitle-1 font-weight-bold mb-2">
                                {{ candidate.studentName }}
                                <v-chip
                                  small
                                  :color="getRankColor(candidate.rank)"
                                  dark
                                  class="ml-2"
                                >
                                  {{ candidate.votes }} votes
                                </v-chip>
                              </h3>

                              <v-simple-table dense>
                                <template v-slot:default>
                                  <thead>
                                    <tr>
                                      <th>Course</th>
                                      <th class="text-center">Votes</th>
                                      <th class="text-right">Percentage</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="program in getProgramBreakdown(
                                        candidate
                                      )"
                                      :key="program.programId"
                                    >
                                      <td>{{ program.programName }}</td>
                                      <td class="text-center">
                                        {{ program.votes }}
                                      </td>
                                      <td class="text-right">
                                        <v-progress-linear
                                          :value="
                                            calculateProgramPercentage(
                                              program.votes,
                                              candidate.votes
                                            )
                                          "
                                          height="20"
                                          :color="
                                            getProgressColor(candidate.rank)
                                          "
                                        >
                                          <template v-slot:default>
                                            {{
                                              calculateProgramPercentage(
                                                program.votes,
                                                candidate.votes
                                              )
                                            }}%
                                          </template>
                                        </v-progress-linear>
                                      </td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                              <v-divider class="my-4"></v-divider>
                            </div>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>

                      <!-- Year Level breakdown -->
                      <v-tab-item>
                        <v-card flat>
                          <v-card-text>
                            <div
                              v-for="candidate in getTableItems(candidates)"
                              :key="candidate.studentName"
                            >
                              <h3 class="subtitle-1 font-weight-bold mb-2">
                                {{ candidate.studentName }}
                                <v-chip
                                  small
                                  :color="getRankColor(candidate.rank)"
                                  dark
                                  class="ml-2"
                                >
                                  {{ candidate.votes }} votes
                                </v-chip>
                              </h3>

                              <v-simple-table dense>
                                <template v-slot:default>
                                  <thead>
                                    <tr>
                                      <th>Year Level</th>
                                      <th class="text-center">Votes</th>
                                      <th class="text-right">Percentage</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="year in getYearLevelBreakdown(
                                        candidate
                                      )"
                                      :key="year.yearLevel"
                                    >
                                      <td>{{ year.yearLevel }}</td>
                                      <td class="text-center">
                                        {{ year.votes }}
                                      </td>
                                      <td class="text-right">
                                        <v-progress-linear
                                          :value="
                                            calculateProgramPercentage(
                                              year.votes,
                                              candidate.votes
                                            )
                                          "
                                          height="20"
                                          :color="
                                            getProgressColor(candidate.rank)
                                          "
                                        >
                                          <template v-slot:default>
                                            {{
                                              calculateProgramPercentage(
                                                year.votes,
                                                candidate.votes
                                              )
                                            }}%
                                          </template>
                                        </v-progress-linear>
                                      </td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                              <v-divider class="my-4"></v-divider>
                            </div>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <v-btn
      color="primary"
      outlined
      class="mt-4"
      :to="{ path: '/election/portal' }"
    >
      <v-icon left>mdi-arrow-left</v-icon>
      Back to Elections
    </v-btn>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="4000"
      bottom
    >
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
import { Bar } from "vue-chartjs";

const BarChart = {
  extends: Bar,
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    chartData: {
      handler() {
        if (this.$data._chart) {
          this.$data._chart.destroy();
          this.renderChart(this.chartData, this.options);
        }
      },
      deep: true,
    },
  },
};

export default {
  name: "ElectionResults",

  components: {
    BarChart,
  },

  data: () => ({
    activeTab: null,
    demographics: null,
    results: null,
    electionDetails: null,
    loading: false,
    error: null,
    totalVotes: 0,
    exporting: null,
    snackbar: {
      show: false,
      text: "",
      color: "info",
    },
    tableHeaders: [
      { text: "Rank", value: "rank", width: "80" },
      { text: "Candidate", value: "candidate", sortable: false },
      { text: "Votes", value: "votes", align: "center" },
      { text: "Percentage", value: "percentage", align: "end", width: "200" },
    ],
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            },
            gridLines: {
              display: true,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFontFamily: "Roboto",
        bodyFontFamily: "Roboto",
        callbacks: {
          label: function (tooltipItem) {
            return `Votes: ${tooltipItem.yLabel}`;
          },
        },
      },
    },
  }),

  computed: {
    electionId() {
      return this.$route.params.id;
    },

    hasResults() {
      return this.results && Object.keys(this.results).length > 0;
    },
  },

  methods: {
    getProgramBreakdown(candidate) {
      if (!candidate || !this.demographics) {
        return [];
      }

      const position = Object.keys(this.results).find((pos) =>
        this.results[pos].some((c) => c.studentName === candidate.studentName)
      );

      if (!position || !this.demographics[position]) {
        return [];
      }

      const candidateData = this.demographics[position].candidates.find(
        (c) => c.candidateName === candidate.studentName
      );

      if (!candidateData?.programBreakdown) {
        return [];
      }

      return candidateData.programBreakdown;
    },

    getYearLevelBreakdown(candidate) {
      if (!candidate || !this.demographics) {
        return [];
      }

      const position = Object.keys(this.results).find((pos) =>
        this.results[pos].some((c) => c.studentName === candidate.studentName)
      );

      if (!position || !this.demographics[position]) {
        return [];
      }

      const candidateData = this.demographics[position].candidates.find(
        (c) => c.candidateName === candidate.studentName
      );

      if (!candidateData?.programBreakdown?.[0]?.yearLevels) {
        return [];
      }

      return candidateData.programBreakdown[0].yearLevels;
    },

    calculateProgramPercentage(votes, totalVotes) {
      if (!totalVotes || !votes) return 0;
      const percentage = (votes / totalVotes) * 100;
      return percentage.toFixed(1);
    },

    async fetchResults() {
      this.loading = true;
      this.error = null;
      try {
        const [resultsResponse, electionResponse, demographicsResponse] =
          await Promise.all([
            this.$http.get(`/vote/results/${this.electionId}`),
            this.$http.get(`/election/${this.electionId}`),
            this.$http.get(`/vote/results/${this.electionId}/demographics`),
          ]);

        this.results = resultsResponse.data.data;
        this.electionDetails = electionResponse.data;
        this.demographics = demographicsResponse.data.data;

        console.log(this.demographics);
        this.calculateTotalVotes();
      } catch (error) {
        console.error("Error fetching results:", error);
        this.error = "Failed to load election results. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    calculateTotalVotes() {
      this.totalVotes = Object.values(this.results).reduce(
        (total, candidates) => {
          const positionTotal = candidates.reduce(
            (sum, candidate) => sum + candidate.votes,
            0
          );
          return total + positionTotal;
        },
        0
      );
    },

    getWinner(candidates) {
      return this.sortCandidatesByVotes(candidates)[0];
    },

    sortCandidatesByVotes(candidates) {
      return [...candidates].sort((a, b) => b.votes - a.votes);
    },

    calculatePercentage(votes) {
      if (this.totalVotes === 0) return "0.0";
      return ((votes / this.totalVotes) * 100).toFixed(1);
    },

    getChartData(candidates) {
      const sortedCandidates = this.sortCandidatesByVotes(candidates);
      return {
        labels: sortedCandidates.map((c) => c.studentName),
        datasets: [
          {
            data: sortedCandidates.map((c) => c.votes),
            backgroundColor: sortedCandidates.map((c, index) =>
              this.getBarColor(index)
            ),
            borderWidth: 1,
          },
        ],
      };
    },

    getBarColor(index) {
      const colors = ["#4CAF50", "#1976D2", "#FF9800", "#9C27B0", "#607D8B"];
      return colors[index % colors.length];
    },

    getTableItems(candidates) {
      return this.sortCandidatesByVotes(candidates).map((candidate, index) => ({
        rank: index + 1,
        candidate: candidate.studentName,
        studentName: candidate.studentName,
        imageUrl: candidate.imageUrl,
        votes: candidate.votes,
        percentage: Number(this.calculatePercentage(candidate.votes)),
      }));
    },

    getRankColor(rank) {
      const colors = {
        1: "success",
        2: "info",
        3: "warning",
      };
      return colors[rank] || "grey";
    },

    getProgressColor(rank) {
      const colors = {
        1: "success",
        2: "info",
        3: "warning",
      };
      return colors[rank] || "grey lighten-1";
    },

    getStatusColor(status) {
      const colors = {
        ongoing: "warning",
        completed: "success",
        upcoming: "info",
      };
      return colors[status?.toLowerCase()] || "grey";
    },

    getWinnerChipColor(candidates) {
      const winner = this.getWinner(candidates);
      if (!winner) return "grey";
      if (winner.votes === 0) return "warning";
      return "success";
    },

    getWinnerChipText(candidates) {
      const winner = this.getWinner(candidates);
      if (!winner) return "No Votes";
      if (winner.votes === 0) return "No Winner Yet";
      return "Winner Declared";
    },

    async exportResults(format) {
      this.exporting = format;
      try {
        const response = await this.$http.get(
          `/votes/export/${this.electionId}?format=${format}`,
          { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `election-results-${this.electionId}.${format}`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();

        this.showSnackbar("Export successful!", "success");
      } catch (error) {
        console.error("Export error:", error);
        this.showSnackbar("Failed to export results", "error");
      } finally {
        this.exporting = null;
      }
    },

    showSnackbar(text, color = "info") {
      this.snackbar = {
        show: true,
        text,
        color,
      };
    },
  },

  async created() {
    await this.fetchResults();
  },

  beforeDestroy() {
    // Clean up any chart instances
    if (this.$refs.chart && this.$refs.chart.$data._chart) {
      this.$refs.chart.$data._chart.destroy();
    }
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 250px;
  margin: 20px 0;
}

.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.position-header {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 8px 16px;
  margin-bottom: 16px;
}

.winner-banner {
  border-left: 4px solid #4caf50;
  background-color: #e8f5e9;
}

.percentage-bar {
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
}

@media (max-width: 600px) {
  .chart-container {
    height: 300px;
  }

  .v-card-title {
    flex-direction: column;
    align-items: flex-start;

    .v-chip {
      margin-top: 8px;
      margin-left: 0 !important;
    }
  }

  .table-actions {
    flex-direction: column;

    .v-btn {
      margin: 4px 0;
    }
  }
}

/* Animation classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.v-data-table ::v-deep {
  .v-data-table__wrapper {
    overflow-x: auto;
  }

  th {
    font-weight: bold !important;
    white-space: nowrap;
    background-color: #f5f5f5;
  }

  td {
    height: 60px !important;
  }

  .rank-column {
    width: 80px;
    text-align: center;
  }

  .percentage-column {
    min-width: 200px;
  }
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #666;
}

.v-data-table {
  background: transparent !important;
}

.v-data-table ::v-deep td {
  height: 40px !important;
}

.demographics-table {
  margin-top: 16px;
}

.v-progress-linear {
  border-radius: 4px;
}

.candidate-breakdown {
  margin-bottom: 24px;
}

.v-expansion-panel-content .v-card {
  box-shadow: none !important;
}

.v-tabs {
  margin-bottom: 16px;
}

@media (max-width: 600px) {
  .v-data-table {
    overflow-x: auto;
  }

  .demographics-breakdown {
    padding: 8px;
  }
}
</style>
