<template>
  <v-container fluid>
    <v-card class="elevation-2">
      <v-card-title class="headline">
        Student
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search students"
          clearable
          outlined
          dense
          hide-details
          class="mr-4"
          rounded
          style="max-width: 300px"
        ></v-text-field>
        <v-btn color="primary" @click="openCreateDialog">
          <v-icon left>mdi-plus</v-icon>
          Add New Student
        </v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="students"
        :search="search"
        :items-per-page="10"
        class="elevation-1"
        :loading="loading"
        loading-text="Loading students... Please wait"
        no-data-text="No students found"
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="item.status === 'active' ? 'green' : 'red'"
            text-color="white"
            small
          >
            {{ item.status }}
          </v-chip>
        </template>

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

    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                  v-model="editedItem.StudentIdNo"
                  label="Student ID"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.firstName"
                  label="First Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.middleName"
                  label="Middle Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.lastName"
                  label="Last Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="editedItem.yearLevel"
                  :items="['First', 'Second', 'Third', 'Fourth']"
                  label="Year Level"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="editedItem.gender"
                  :items="['Male', 'Female']"
                  label="Gender"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                  type="email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="displayPhoneNo"
                  label="Phone No"
                  required
                  :rules="[phoneRules.required, phoneRules.format]"
                  v-mask="'+63 ###-###-####'"
                  placeholder="+63 XXX-XXX-XXXX"
                  @input="handlePhoneInput"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="8">
                <v-select
                  v-model="editedItem.programId"
                  :items="programs"
                  item-text="programName"
                  item-value="_id"
                  label="Program"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="editedItem.classroomId"
                  :items="classrooms"
                  item-text="name"
                  item-value="_id"
                  label="Section"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="editedItem.status"
                  :items="['active', 'inactive']"
                  label="Status"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col cols="12">
                <v-alert color="info" border="left" colored-border dense>
                  Student Password Information
                </v-alert>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.password"
                  :type="showPassword ? 'text' : 'password'"
                  label="Student Password"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append="showPassword = !showPassword"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveStudent">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete Student</v-card-title>
        <v-card-text>Are you sure you want to delete this student?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDeleteDialog"
            >Cancel</v-btn
          >
          <v-btn color="red darken-1" text @click="deleteStudent">Delete</v-btn>
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
import { mask } from "vue-the-mask";


export default {
  name: "StudentManagementPage",
  directives: {
    mask,
  },
  data: () => ({
    dialog: false,
    deleteDialog: false,
    snackbar: false,
    snackbarColor: "",
    snackbarText: "",
    loading: false,
    search: "",
    showPassword: false,
    headers: [
      { text: "Student ID", value: "StudentIdNo" },
      { text: "First Name", value: "firstName" },
      { text: "Middle Name", value: "middleName" },
      { text: "Last Name", value: "lastName" },
      { text: "Year Level", value: "yearLevel" },
      { text: "Gender", value: "gender" },
      { text: "Email", value: "email" },
      { text: "Phone No", value: "displayPhoneNo" },
      { text: "Program", value: "programId.programName" },
      { text: "Section", value: "classroomId.name" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    students: [],
    programs: [],
    classrooms: [],
    editedIndex: -1,
    editedItem: {
      _id: "",
      firstName: "",
      middleName: "",
      lastName: "",
      StudentIdNo: "",
      yearLevel: null,
      gender: null,
      email: "",
      phoneNo: "",
      programId: null,
      classroomId: null,
      status: "active",
    },
    defaultItem: {
      firstName: "",
      middleName: "",
      lastName: "",
      StudentIdNo: "",
      yearLevel: null,
      gender: null,
      email: "",
      phoneNo: "",
      programId: null,
      classroomId: null,
      status: "active",
    },
    showPassword: false,
    displayPhoneNo: '', 
    phoneRules: {
      required: v => !!v || 'Phone number is required',
      format: v => /^\+63 \d{3}-\d{3}-\d{4}$/.test(v) || 'Invalid phone number format'
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Student" : "Edit Student";
    },
  },

  created() {
    this.fetchStudents();
    this.fetchPrograms();
    this.fetchClassrooms();
  },

  methods: {
    async fetchStudents() {
      this.loading = true;
      try {
        const response = await this.$http.get("/student");
        this.students = response.data.data.items.map(student => ({
          ...student,
          displayPhoneNo: this.formatPhoneForDisplay(student.phoneNo)
        }));
      } catch (error) {
        console.error("Error fetching students:", error);
        this.showSnackbar("Error fetching students", "error");
      } finally {
        this.loading = false;
      }
    },

    async fetchPrograms() {
      try {
        const response = await this.$http.get("/program");
        this.programs = response.data.data.items;
      } catch (error) {
        console.error("Error fetching programs:", error);
        this.showSnackbar("Error fetching programs", "error");
      }
    },

    async fetchClassrooms() {
      try {
        const response = await this.$http.get("/classroom");
        this.classrooms = response.data.data.items;
      } catch (error) {
        console.error("Error fetching classrooms:", error);
        this.showSnackbar("Error fetching classrooms", "error");
      }
    },

    formatPhoneNumber(value) {
      if (!value) return;
      if (!value.startsWith("+63 ")) {
        this.editedItem.phoneNo = "+63 " + value.replace(/^\+63\s?/, "");
      }
    },

    formatPhoneForDisplay(phoneNo) {
      if (!phoneNo) return '';
      return phoneNo.replace(/(\+63)(\d{3})(\d{3})(\d{4})/, '$1 $2-$3-$4');
    },

    handlePhoneInput(value) {
      if (!value) return;
      if (!value.startsWith('+63 ')) {
        this.displayPhoneNo = '+63 ' + value.replace(/^\+63\s?/, '');
      }
      this.editedItem.phoneNo = value.replace(/[\s-]/g, '');
    },

    openCreateDialog() {
      this.editedIndex = -1;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.displayPhoneNo = ''
      this.dialog = true;
    },

    openEditDialog(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.displayPhoneNo = this.formatPhoneForDisplay(item.phoneNo);
      this.dialog = true;
    },

    openDeleteDialog(item) {
      this.editedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },

    closeDialog() {
      this.showPassword = false;
      this.dialog = false;
      this.displayPhoneNo = '';
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
    async saveStudent() {
      try {
        const studentData = {
          ...this.editedItem,
          phoneNo: this.editedItem.phoneNo.replace(/[\s-]/g, '')
        };

        if (this.editedIndex > -1) {
          await this.$http.put(`/student/${studentData._id}`, studentData);
          Object.assign(this.students[this.editedIndex], studentData);
          this.showSnackbar("Student updated successfully", "success");
        } else {
          const response = await this.$http.post("/student", studentData);
          this.students.push(response.data.data.item);
          this.showSnackbar("Student created successfully", "success");
        }
        this.closeDialog();
        this.fetchStudents();
      } catch (error) {
        console.error("Error saving student:", error);
        this.showSnackbar("Error saving student", "error");
      }
    },

    async deleteStudent() {
      try {
        await this.$http.delete(`/student/${this.editedItem._id}`);
        const index = this.students.findIndex(
          (student) => student._id === this.editedItem._id
        );
        this.students.splice(index, 1);
        this.closeDeleteDialog();
        this.showSnackbar("Student deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting student:", error);
        this.showSnackbar("Error deleting student", "error");
      }
    },

    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.showPassword = false;
      }
    },
  },
};
</script>
