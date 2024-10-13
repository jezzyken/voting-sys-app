<template>
  <v-container fluid>
    <v-card class="elevation-2">
      <v-card-title class="headline">
        Candidates
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search candidates"
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
          File Candidacy
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="candidates"
        :search="search"
        :items-per-page="10"
        class="elevation-1"
        :loading="loading"
        loading-text="Loading candidates... Please wait"
        no-data-text="No candidates found"
        :footer-props="{
          'items-per-page-options': [5, 10, 15, 20],
        }"
      >
        <template v-slot:item="{ item, index }">
          <tr :class="index % 2 === 0 ? 'grey lighten-4' : ''">
            <td>
              <img
                :src="item.imageUrl"
                alt="Student Image"
                width="50"
                height="50"
                class="ma-2"
              />
            </td>
            <td>{{ item.studentName }}</td>
            <td>{{ item.position }}</td>
            <td>{{ item.manifesto }}</td>
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
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-autocomplete
                v-model="editedItem.studentId"
                :items="students"
                item-text="name"
                item-value="_id"
                label="Search Student by Name or LRN"
                placeholder="Start typing to search"
                prepend-icon="mdi-database-search"
                return-object
                required
                :rules="[(v) => !!v || 'Student is required']"
              >
                <template v-slot:item="{ item }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="item.lrn"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
              <v-select
                v-model="editedItem.electionId"
                :items="elections"
                item-text="name"
                item-value="_id"
                label="Election"
                required
                @change="onSelectElection"
                :rules="[(v) => !!v || 'Election is required']"
              ></v-select>
              <v-select
                v-model="editedItem.position"
                :items="positions"
                label="Position"
                required
                :rules="[(v) => !!v || 'Position is required']"
              ></v-select>

              <v-file-input
                v-model="imageFile"
                accept="image/*"
                label="Candidate Image"
                prepend-icon="mdi-camera"
              ></v-file-input>

              <v-img
                v-if="editedItem.imageUrl"
                :src="editedItem.imageUrl"
                max-height="200"
                contain
              ></v-img>

              <!-- <v-select
                v-model="editedItem.partyId"
                :items="parties"
                item-text="name"
                item-value="_id"
                label="Party"
              ></v-select> -->
              <v-textarea
                v-model="editedItem.manifesto"
                label="Manifesto"
                required
                :rules="[(v) => !!v || 'Manifesto is required']"
              ></v-textarea>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveCandidate">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete Candidate</v-card-title>
        <v-card-text
          >Are you sure you want to delete this candidate?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDeleteDialog"
            >Cancel</v-btn
          >
          <v-btn color="red darken-1" text @click="deleteCandidate"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
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
  name: "CandidateManagementPage",
  data: () => ({
    dialog: false,
    deleteDialog: false,
    valid: true,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    loading: false,
    search: "",
    headers: [
      {
        text: "Image",
        value: "imageUrl",
        align: "start",
      },
      {
        text: "Student Name",
        value: "studentName",
        align: "start",
        sortable: true,
      },
      { text: "Position", value: "position", sortable: true },
      { text: "Manifesto", value: "manifesto", sortable: false, left: "end" },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    candidates: [],
    students: [],
    elections: [],
    positions: [],
    parties: [],
    editedIndex: -1,
    editedItem: {
      _id: "",
      studentId: "",
      electionId: "",
      position: "",
      partyId: "",
      manifesto: "",
    },
    defaultItem: {
      studentId: "",
      electionId: "",
      position: "",
      partyId: "",
      manifesto: "",
    },
    imageFile: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "File Candidacy" : "Edit Candidate";
    },
  },

  created() {
    this.fetchCandidates();
    this.fetchStudents();
    this.fetchElections();
    console.log("Current environment:", currentEnv);
    console.log("API Base URL:", baseURL);
  },

  methods: {
    async fetchCandidates() {
      this.loading = true;
      try {
        const response = await this.$http.get("/candidate");
        this.candidates = response.data.data.items.map((item) => ({
          ...item,
          studentName: `${item.studentId.lastName}, ${item.studentId.firstName} ${item.studentId.middleName}`,
        }));
      } catch (error) {
        console.error("Error fetching candidates:", error);
        this.showSnackbar("Error fetching candidates", "error");
      } finally {
        this.loading = false;
      }
    },

    async fetchStudents() {
      try {
        const response = await this.$http.get("/student");
        this.students = response.data.data.items.map((item) => ({
          ...item,
          name: `${item.lastName}, ${item.firstName} ${item.middleName}`,
        }));
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    },

    async fetchElections() {
      try {
        const response = await this.$http.get("/election");
        this.elections = response.data.data.items;
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    },

    openCreateDialog() {
      this.editedIndex = -1;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.dialog = true;
    },

    openEditDialog(item) {
      this.positions = this.elections
        .filter((e) => e._id === item.electionId._id)
        .map((item) => item.positions)[0];
      this.editedIndex = this.candidates.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.imageFile = null;
        this.$refs.form.reset();
      });
    },
    openDeleteDialog(item) {
      this.editedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },

    closeDeleteDialog() {
      this.deleteDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    async saveCandidate() {
      if (this.$refs.form.validate()) {
        try {
          const formData = new FormData();
          Object.keys(this.editedItem).forEach((key) => {
            if (key !== "studentId") {
              formData.append(key, this.editedItem[key]);
            }
          });
          formData.append("studentId", this.editedItem.studentId._id);

          if (this.imageFile) {
            formData.append("image", this.imageFile);
          }

          let response;
          if (this.editedIndex > -1) {
            response = await this.$http.put(
              `/candidate/${this.editedItem._id}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            Object.assign(
              this.candidates[this.editedIndex],
              response.data.data.item
            );
            this.showSnackbar("Candidate updated successfully", "success");
          } else {
            response = await this.$http.post("/candidate", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            this.candidates.push(response.data.data.item);
            this.showSnackbar("Candidacy filed successfully", "success");
          }
          this.closeDialog();
        } catch (error) {
          console.error("Error saving candidate:", error);
          this.showSnackbar("Error saving candidate", "error");
        }
      }
    },

    async deleteCandidate() {
      try {
        await this.$http.delete(`/candidate/${this.editedItem._id}`);
        const index = this.candidates.findIndex(
          (candidate) => candidate._id === this.editedItem._id
        );
        this.candidates.splice(index, 1);
        this.closeDeleteDialog();
        this.showSnackbar("Candidate deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting candidate:", error);
        this.showSnackbar("Error deleting candidate", "error");
      }
    },

    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },

    onSelectElection(id) {
      this.positions = this.elections
        .filter((e) => e._id === id)
        .map((item) => item.positions)[0];
    },
  },
};
</script>
