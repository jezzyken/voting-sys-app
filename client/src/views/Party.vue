<template>
  <v-container fluid>
    <v-card class="elevation-2">
      <v-card-title class="headline">
        Parties
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search parties"
          clearable
          outlined
          dense
          hide-details
          class="mr-4"
          rounded
          style="max-width: 300px;"
        ></v-text-field>
        <v-btn color="primary" @click="openCreateDialog">
          <v-icon left>mdi-plus</v-icon>
          Add New Party
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="parties"
        :search="search"
        :items-per-page="10"
        class="elevation-1"
        :loading="loading"
        loading-text="Loading parties... Please wait"
        no-data-text="No parties found"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn icon small class="mr-2" @click="openEditDialog(item)">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small @click="openDeleteDialog(item)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
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
                  v-model="editedItem.name"
                  label="Party Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.platform"
                  label="Party Platform"
                  rows="3"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveParty">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete Party</v-card-title>
        <v-card-text>Are you sure you want to delete this party?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDeleteDialog">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteParty">Delete</v-btn>
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
export default {
  name: "PartyManagementPage",
  data: () => ({
    dialog: false,
    deleteDialog: false,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    loading: false,
    search: "",
    headers: [
      { text: "Party Name", value: "name" },
      { text: "Platform", value: "platform" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    parties: [],
    editedIndex: -1,
    editedItem: {
      _id: "",
      name: "",
      platform: "",
    },
    defaultItem: {
      name: "",
      platform: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Party" : "Edit Party";
    },
  },

  created() {
    this.fetchParties();
  },

  methods: {
    async fetchParties() {
      this.loading = true;
      try {
        const response = await this.$http.get("/party");
        this.parties = response.data.data.items;
      } catch (error) {
        console.error("Error fetching parties:", error);
        this.showSnackbar("Error fetching parties", "error");
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
      this.editedIndex = this.parties.indexOf(item);
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

    async saveParty() {
      try {
        if (this.editedIndex > -1) {
          await this.$http.put(`/party/${this.editedItem._id}`, this.editedItem);
          Object.assign(this.parties[this.editedIndex], this.editedItem);
          this.showSnackbar("Party updated successfully", "success");
        } else {
          const response = await this.$http.post("/party", this.editedItem);
          this.parties.push(response.data.data.item);
          this.showSnackbar("Party created successfully", "success");
        }
        this.closeDialog();
        this.fetchParties();
      } catch (error) {
        console.error("Error saving party:", error);
        this.showSnackbar("Error saving party", "error");
      }
    },

    async deleteParty() {
      try {
        await this.$http.delete(`/party/${this.editedItem._id}`);
        const index = this.parties.findIndex(
          (party) => party._id === this.editedItem._id
        );
        this.parties.splice(index, 1);
        this.closeDeleteDialog();
        this.showSnackbar("Party deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting party:", error);
        this.showSnackbar("Error deleting party", "error");
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