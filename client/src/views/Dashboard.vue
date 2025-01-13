<!-- components/Dashboard.vue -->
<template>
  <v-container fluid>
    <!-- Statistics Cards -->
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto stat-card" color="primary" dark height="150">
          <v-card-text>
            <div class="text-h6 card-title">Total Elections</div>
            <div class="text-h4 mt-4">{{ statistics.totalElections }}</div>
            <div class="mt-4">
              <v-chip x-small> {{ statistics.activeElections }} Active </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto stat-card" color="success" dark height="150">
          <v-card-text>
            <div class="text-h6 card-title">Total Candidates</div>
            <div class="text-h4 mt-4">{{ statistics.totalCandidates }}</div>
            <div class="mt-4">
              <v-chip x-small>
                {{ statistics.currentCandidates }} Current
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card
          class="mx-auto stat-card"
          color="teal darken-1"
          dark
          height="150"
        >
          <v-card-text>
            <div class="text-h6 card-title">Total Students</div>
            <div class="text-h4 mt-4">{{ statistics.totalStudents }}</div>
            <div class="mt-4">
              <v-chip x-small> {{ statistics.activeStudents }} Active </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="mx-auto stat-card" color="warning" dark height="150">
          <v-card-text>
            <div class="text-h6 card-title d-flex align-center">
              Current Election Votes
              <v-chip
                x-small
                class="ml-2"
                style="
                  max-width: 120px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
              >
                {{ statistics.currentElection }}
              </v-chip>
            </div>
            <div class="text-h4 mt-4">{{ statistics.totalVotes }}</div>
            <div class="mt-4">
              <v-chip x-small>
                {{ statistics.votingPercentage }}% Turnout
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card height="500">
          <v-card-title class="chart-title">
            Voting Trends
            <v-chip x-small class="ml-2">{{ votingTrendsElection }}</v-chip>
          </v-card-title>
          <v-card-text class="chart-container">
            <div class="chart-wrapper">
              <line-chart
                v-if="!loading && votingTrendsData.datasets[0].data.length > 0"
                :chart-data="votingTrendsData"
                :options="chartOptions"
              ></line-chart>
              <div
                v-else-if="loading"
                class="d-flex justify-center align-center fill-height"
              >
                <v-progress-circular indeterminate></v-progress-circular>
              </div>
              <div
                v-else
                class="d-flex justify-center align-center fill-height"
              >
                No voting data available
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card height="500">
          <v-card-title class="chart-title">
            Student Participation
            <v-chip x-small class="ml-2">{{ participationElection }}</v-chip>
          </v-card-title>
          <v-card-text class="chart-container">
            <div class="chart-wrapper">
              <pie-chart
                v-if="
                  !loading &&
                  participationData.datasets[0].data.some((value) => value > 0)
                "
                :chart-data="participationData"
                :options="pieChartOptions"
              ></pie-chart>
              <div
                v-else-if="loading"
                class="d-flex justify-center align-center fill-height"
              >
                <v-progress-circular indeterminate></v-progress-circular>
              </div>
              <div
                v-else
                class="d-flex justify-center align-center fill-height"
              >
                No participation data available
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Current Elections
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              dense
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="electionHeaders"
            :items="currentElections"
            :search="search"
            :items-per-page="5"
            :loading="loading"
            class="elevation-1"
          >
            <template v-slot:item.status="{ item }">
              <v-chip :color="getStatusColor(item.status)" small dark label>
                {{ item.status }}
              </v-chip>
            </template>

            <template v-slot:item.progress="{ item }">
              <div class="d-flex align-center">
                <v-progress-linear
                  :value="item.progress"
                  :color="getProgressColor(item.progress)"
                  height="20"
                  rounded
                >
                  <template v-slot:default>
                    {{ Math.ceil(item.progress) }}%
                  </template>
                </v-progress-linear>
              </div>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-tooltip bottom v-if="item.status === 'completed'">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    icon
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="viewElectionResults(item)"
                  >
                    <v-icon>mdi-chart-bar</v-icon>
                  </v-btn>
                </template>
                <span>View Final Results</span>
              </v-tooltip>

              <v-tooltip bottom v-if="item.status !== 'completed'">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    icon
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="viewPartiaResults(item)"
                  >
                    <v-icon>mdi-chart-timeline-variant</v-icon>
                  </v-btn>
                </template>
                <span>View Partial Results</span>
              </v-tooltip>
            </template>

            <template v-slot:no-data>
              <div class="pa-4 text-center">No elections available</div>
            </template>

            <template v-slot:no-results>
              <div class="pa-4 text-center">
                No elections matching your search
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dashboardService from "@/services/dashboardService";
import { Line, Pie } from "vue-chartjs";
import moment from "moment";

const LineChart = {
  extends: Line,
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
};

const PieChart = {
  extends: Pie,
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
};

export default {
  components: {
    LineChart,
    PieChart,
  },
  data: () => ({
    loading: false,
    votingTrendsElection: "No ongoing election",
    participationElection: "No ongoing election",
    search: "",
    statistics: {
      totalElections: 0,
      activeElections: 0,
      totalCandidates: 0,
      currentCandidates: 0,
      totalStudents: 0,
      activeStudents: 0,
      totalVotes: 0,
      votingPercentage: 0,
      currentElection: "No ongoing election",
    },
    electionHeaders: [
      { text: "Election Name", value: "name", sortable: true },
      { text: "Type", value: "electionType", sortable: true },
      { text: "Status", value: "status", sortable: true },
      { text: "End Date", value: "endDate", sortable: true },
      { text: "Progress", value: "progress", sortable: false },
      { text: "Actions", value: "actions", sortable: false, align: "center" },
    ],
    currentElections: [],
    votingTrendsData: {
      labels: [],
      datasets: [
        {
          label: "Votes per Day",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          data: [],
          fill: true,
        },
      ],
    },
    participationData: {
      labels: ["Voted", "Not Voted"],
      datasets: [
        {
          backgroundColor: ["#4CAF50", "#FF5252"],
          data: [0, 0],
        },
      ],
    },
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
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            type: "time",
            distribution: "linear",
            time: {
              unit: "minute",
              displayFormats: {
                minute: "HH:mm",
              },
              parser: function (date) {
                return moment(date);
              },
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
            },
            gridLines: {
              drawBorder: false,
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          title: function (tooltipItem) {
            return moment(tooltipItem[0].xLabel).format("YYYY-MM-DD HH:mm");
          },
        },
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
    },
    pieChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          boxWidth: 12,
        },
      },
    },
  }),

  methods: {
    getProgressColor(progress) {
      if (progress < 30) return "error";
      if (progress < 70) return "warning";
      return "success";
    },

    getStatusColor(status) {
      switch (status) {
        case "upcoming":
          return "orange";
        case "ongoing":
          return "green";
        case "completed":
          return "grey";
        default:
          return "grey";
      }
    },

    async fetchDashboardData() {
      try {
        this.loading = true;

        const [
          statistics,
          votingTrendsResponse,
          participationResponse,
          currentElectionsResponse,
        ] = await Promise.all([
          dashboardService.getDashboardStatistics(),
          dashboardService.getVotingTrends(),
          dashboardService.getParticipationStats(),
          dashboardService.getCurrentElections(),
        ]);

        this.statistics = statistics;

        this.currentElections = currentElectionsResponse.map((item) => ({
          ...item,
          endDate: moment(item.endDate).format("YYYY-MM-DD"),
        }));

        console.log(this.currentElections);

        if (votingTrendsResponse.trends) {
          this.votingTrendsElection = votingTrendsResponse.electionName;
          this.votingTrendsData = {
            labels: votingTrendsResponse.trends.map((trend) =>
              moment(trend.date)
            ),
            datasets: [
              {
                label: "Votes per Minute",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                data: votingTrendsResponse.trends.map((trend) => ({
                  x: moment(trend.date),
                  y: trend.count,
                })),
                fill: true,
              },
            ],
          };
        }

        if (participationResponse.stats) {
          this.participationElection = participationResponse.electionName;
          this.participationData = {
            labels: ["Voted", "Not Voted"],
            datasets: [
              {
                ...this.participationData.datasets[0],
                data: [
                  participationResponse.stats.voted,
                  participationResponse.stats.notVoted,
                ],
              },
            ],
          };
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        this.loading = false;
      }
    },

    viewElectionResults(item) {
      this.$router.push(`/election/results/${item.id}/view`);
    },
    viewPartiaResults(item) {
      this.$router.push(`/election/${item.id}/partial-results`);
    },
  },

  mounted() {
    this.fetchDashboardData();
    // this.refreshInterval = setInterval(this.fetchDashboardData, 60000);
  },
  beforeDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  },
};
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease-in-out;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
}

.chart-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.stat-card {
  transition: all 0.3s ease-in-out;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
}

.v-card__text {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
}

.text-h4 {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.v-chip {
  font-size: 0.75rem;
}

.chart-title {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 16px;
}

.chart-container {
  height: calc(100% - 64px);
  padding: 16px;
  position: relative;
}

.chart-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.fill-height {
  height: 100%;
}

.v-data-table {
  width: 100%;
}

.v-data-table >>> .v-data-table__wrapper {
  overflow-x: auto;
}

.v-data-table >>> .v-data-table__progress {
  margin: 0;
}

.v-chip.v-size--small {
  height: 24px;
}

.text-center {
  text-align: center;
}
</style>
