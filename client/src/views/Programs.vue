<template>
  <v-container fluid>
    <v-card class="elevation-2">
      <v-card-title class="headline">
        Courses
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search course"
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
          Add New Course
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="programs"
        :search="search"
        :items-per-page="10"
        class="elevation-1"
        :loading="loading"
        loading-text="Loading course... Please wait"
        no-data-text="No course found"
        :footer-props="{
          'items-per-page-options': [5, 10, 15, 20],
        }"
      >
        <template v-slot:item="{ item, index }">
          <tr :class="index % 2 === 0 ? 'grey lighten-4' : ''">
            <td>{{ item.programName }}</td>
            <td>{{ item.programAbr }}</td>
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

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.programName"
                  label="Course Name"
                  :rules="[(v) => !!v || 'Course name is required']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.programAbr"
                  label="Course Code"
                  :rules="[(v) => !!v || 'Course Code is required']"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveProgram">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete Course</v-card-title>
        <v-card-text>Are you sure you want to delete this course?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDeleteDialog"
            >Cancel</v-btn
          >
          <v-btn color="red darken-1" text @click="deleteProgram">Delete</v-btn>
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
  name: "ProgramManagementPage",
  data: () => ({
    dialog: false,
    deleteDialog: false,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    loading: false,
    search: "",
    headers: [
      {
        text: "Course Name",
        value: "programName",
        align: "start",
        sortable: true,
      },
      {
        text: "Course Code",
        value: "programAbr",
        align: "start",
        sortable: true,
      },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    programs: [],
    editedIndex: -1,
    editedItem: {
      _id: "",
      programName: "",
      programAbr: "",
    },
    defaultItem: {
      programName: "",
      programAbr: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Course" : "Edit Course";
    },
  },

  created() {
    this.fetchPrograms();
    console.log("Current environment:", currentEnv);
    console.log("API Base URL:", baseURL);
  },

  methods: {
    async fetchPrograms() {
      this.loading = true;
      try {
        const response = await this.$http.get("/program");
        console.log(response);
        this.programs = response.data.data.items;
      } catch (error) {
        console.error("Error fetching course:", error);
        this.showSnackbar("Error fetching course", "error");
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
      this.editedIndex = this.programs.indexOf(item);
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

    async saveProgram() {
      if (!this.editedItem.programName) {
        this.showSnackbar("Course name is required", "error");
        return;
      }

      try {
        if (this.editedIndex > -1) {
          await this.$http.put(
            `/program/${this.editedItem._id}`,
            this.editedItem
          );
          Object.assign(this.programs[this.editedIndex], this.editedItem);
          this.showSnackbar("Course updated successfully", "success");
        } else {
          const response = await this.$http.post("/program", this.editedItem);
          console.log(response);
          this.programs.push(response.data.data.item);
          this.showSnackbar("Course created successfully", "success");
        }
        this.closeDialog();
      } catch (error) {
        console.error("Error saving course:", error);
        this.showSnackbar("Error saving course", "error");
      }
    },

    async deleteProgram() {
      try {
        await this.$http.delete(`/program/${this.editedItem._id}`);
        const index = this.programs.findIndex(
          (program) => program._id === this.editedItem._id
        );
        this.programs.splice(index, 1);
        this.closeDeleteDialog();
        this.showSnackbar("course deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting course:", error);
        this.showSnackbar("Error deleting course", "error");
      }
    },

    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },
};
</script>
