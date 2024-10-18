<template>
  <v-container fluid>
    <v-card class="elevation-2">
      <v-card-title class="headline">
        Elections
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search elections"
          clearable
          outlined
          rounded
          dense
          hide-details
          class="mr-4"
          style="max-width: 300px"
        ></v-text-field>
        <v-btn color="primary" @click="openCreateDialog">
          <v-icon left>mdi-plus</v-icon>
          Add New Election
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="elections"
        :search="search"
        :items-per-page="10"
        class="elevation-1"
        :loading="loading"
        loading-text="Loading elections... Please wait"
        no-data-text="No elections found"
        :footer-props="{
          'items-per-page-options': [5, 10, 15, 20],
        }"
      >
        <template v-slot:item="{ item, index }">
          <tr :class="index % 2 === 0 ? 'grey lighten-4' : ''">
            <td>{{ item.name }}</td>
            <td>{{ formatDate(item.startDate) }}</td>
            <td>{{ formatDate(item.endDate) }}</td>
            <td>{{ item.electionType }}</td>
            <td>{{ item.status }}</td>
            <td class="text-right">
              <v-btn icon small class="mr-2" @click="openEditDialog(item)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon small @click="openDeleteDialog(item)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <!-- Create/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.name"
                  label="Election Name"
                  :rules="[(v) => !!v || 'Election name is required']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.startDate"
                      label="Start Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.startDate"
                    no-title
                    @input="startDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="endDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.endDate"
                      label="End Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.endDate"
                    no-title
                    @input="endDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-combobox
                  v-model="editedItem.positions"
                  label="Positions"
                  multiple
                  chips
                  small-chips
                  deletable-chips
                ></v-combobox>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedItem.electionType"
                  :items="['SSC', 'Classroom']"
                  label="Election Type"
                  required
                  @change="handleElectionTypeChange"
                ></v-select>
              </v-col>
              <v-col cols="12" v-if="editedItem.electionType === 'Classroom'">
                <v-select
                  v-model="editedItem.classroomId"
                  :items="classrooms"
                  item-text="name"
                  item-value="_id"
                  label="Classroom"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="editedItem.status"
                  :items="['upcoming', 'ongoing', 'completed']"
                  label="Status"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveElection">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete Election</v-card-title>
        <v-card-text
          >Are you sure you want to delete this election?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDeleteDialog"
            >Cancel</v-btn
          >
          <v-btn color="red darken-1" text @click="deleteElection"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { baseURL, currentEnv } from "@/config/baseURL";

export default {
  name: "ElectionManagementPage",
  data: () => ({
    dialog: false,
    deleteDialog: false,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    loading: false,
    search: "",
    startDateMenu: false,
    endDateMenu: false,
    headers: [
      { text: "Election Name", value: "name", align: "start", sortable: true },
      { text: "Start Date", value: "startDate", sortable: true },
      { text: "End Date", value: "endDate", sortable: true },
      { text: "Type", value: "electionType", sortable: true },
      { text: "Status", value: "status", sortable: true },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    elections: [],
    editedIndex: -1,
    classrooms: [],
    editedItem: {
      _id: "",
      name: "",
      startDate: "",
      endDate: "",
      positions: [],
      electionType: "",
      classroomId: null,
      status: "upcoming",
    },
    defaultItem: {
      name: "",
      startDate: "",
      endDate: "",
      positions: [],
      electionType: "",
      classroomId: null,
      status: "upcoming",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Election" : "Edit Election";
    },
  },

  created() {
    this.fetchElections();
    this.fetchClassrooms();
  },

  methods: {
    async fetchClassrooms() {
      try {
        const response = await this.$http.get("/classroom");
        this.classrooms = response.data.data.items;
      } catch (error) {
        console.error("Error fetching classrooms:", error);
        this.showSnackbar("Error fetching classrooms", "error");
      }
    },

    handleElectionTypeChange() {
      if (this.editedItem.electionType !== "Classroom") {
        this.editedItem.classroomId = null;
      }
    },

    async fetchElections() {
      this.loading = true;
      try {
        const response = await this.$http.get("/election");
        console.log(response);
        this.elections = response.data.data.items;
      } catch (error) {
        console.error("Error fetching elections:", error);
        this.showSnackbar("Error fetching elections", "error");
      } finally {
        this.loading = false;
      }
    },

    openCreateDialog() {
      this.editedIndex = -1;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.dialog = true;
    },

    openEditDialog(item) {
      this.editedIndex = this.elections.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    openDeleteDialog(item) {
      this.editedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDeleteDialog() {
      this.deleteDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    async saveElection() {
      if (!this.validateForm()) {
        return;
      }

      try {
        if (this.editedIndex > -1) {
          await this.$http.put(
            `/election/${this.editedItem._id}`,
            this.editedItem
          );
          Object.assign(this.elections[this.editedIndex], this.editedItem);
          this.showSnackbar("Election updated successfully", "success");
        } else {
          const response = await this.$http.post("/election", this.editedItem);
          console.log(response);
          this.elections.push(response.data.data.item);
          this.showSnackbar("Election created successfully", "success");
        }
        this.closeDialog();
      } catch (error) {
        console.error("Error saving election:", error);
        this.showSnackbar("Error saving election", "error");
      }
    },

    async deleteElection() {
      try {
        await this.$http.delete(`/election/${this.editedItem._id}`);
        const index = this.elections.findIndex(
          (election) => election._id === this.editedItem._id
        );
        this.elections.splice(index, 1);
        this.closeDeleteDialog();
        this.showSnackbar("Election deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting election:", error);
        this.showSnackbar("Error deleting election", "error");
      }
    },

    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    validateForm() {
      if (!this.editedItem.name) {
        this.showSnackbar("Election name is required", "error");
        return false;
      }
      if (!this.editedItem.startDate) {
        this.showSnackbar("Start date is required", "error");
        return false;
      }
      if (!this.editedItem.endDate) {
        this.showSnackbar("End date is required", "error");
        return false;
      }
      if (!this.editedItem.electionType) {
        this.showSnackbar("Election type is required", "error");
        return false;
      }
      if (
        this.editedItem.electionType === "Classroom" &&
        !this.editedItem.classroomId
      ) {
        this.showSnackbar(
          "Classroom is required for Classroom elections",
          "error"
        );
        return false;
      }
      if (
        new Date(this.editedItem.startDate) > new Date(this.editedItem.endDate)
      ) {
        this.showSnackbar("End date must be after start date", "error");
        return false;
      }
      return true;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
