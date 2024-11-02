<template>
  <v-container fluid>
    <v-card class="elevation-2">
      <v-card-title class="headline">
        Users
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search users"
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
          Add New User
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        :items-per-page="10"
        class="elevation-1"
        :loading="loading"
        loading-text="Loading users... Please wait"
        no-data-text="No users found"
        :footer-props="{
          'items-per-page-options': [5, 10, 15, 20],
        }"
      >
        <template v-slot:item="{ item, index }">
          <tr :class="index % 2 === 0 ? 'grey lighten-4' : ''">
            <td>{{ item.name }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.role }}</td>
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
                  v-model="editedItem.name"
                  label="Name"
                  :rules="[(v) => !!v || 'Name is required']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.username"
                  label="Username"
                  :rules="[(v) => !!v || 'Username is required']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.password"
                  label="Password"
                  :rules="[(v) => !!v || 'Password is required']"
                  type="password"
                  required
                  :disabled="editedIndex > -1"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-select
                  v-model="editedItem.role"
                  :items="roles"
                  label="Role"
                  required
                ></v-select>
              </v-col> -->
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete User</v-card-title>
        <v-card-text>Are you sure you want to delete this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDeleteDialog"
            >Cancel</v-btn
          >
          <v-btn color="red darken-1" text @click="deleteUser">Delete</v-btn>
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
  name: "UserManagementPage",
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
        text: "Name",
        value: "name",
        align: "start",
        sortable: true,
      },
      {
        text: "Username",
        value: "username",
        align: "start",
        sortable: true,
      },
      {
        text: "Role",
        value: "role",
        align: "start",
        sortable: true,
      },
      { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    users: [],
    roles: ["admin", "user"],
    editedIndex: -1,
    editedItem: {
      _id: "",
      name: "",
      username: "",
      password: "",
    },
    defaultItem: {
      name: "",
      username: "",
      password: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
  },

  created() {
    this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await this.$http.get("/user");
        this.users = response.data.data;

        console.log( {user: this.users})
      } catch (error) {
        console.error("Error fetching users:", error);
        this.showSnackbar("Error fetching users", "error");
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
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.password = "";
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

    async saveUser() {
      if (
        !this.editedItem.username ||
        (!this.editedIndex > -1 && !this.editedItem.password)
      ) {
        this.showSnackbar("Please fill all required fields", "error");
        return;
      }

      try {
        if (this.editedIndex > -1) {
          if (!this.editedItem.password) {
            delete this.editedItem.password;
          }
          await this.$http.put(`/user/${this.editedItem._id}`, this.editedItem);
          Object.assign(this.users[this.editedIndex], this.editedItem);
          this.showSnackbar("User updated successfully", "success");
        } else {
          const response = await this.$http.post(
            "/user",
            this.editedItem
          );
          this.users.push(response.data.data);
          this.showSnackbar("User created successfully", "success");
        }
        this.closeDialog();
      } catch (error) {
        console.error("Error saving user:", error);
        this.showSnackbar(
          error.response?.data?.message || "Error saving user",
          "error"
        );
      }
    },

    async deleteUser() {
      try {
        await this.$http.delete(`/user/${this.editedItem._id}`);
        const index = this.users.findIndex(
          (user) => user._id === this.editedItem._id
        );
        this.users.splice(index, 1);
        this.closeDeleteDialog();
        this.showSnackbar("User deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        this.showSnackbar("Error deleting user", "error");
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
