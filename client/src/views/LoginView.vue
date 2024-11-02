<template>
  <div class="admin-login-wrapper primary darken-1">
    <v-container
      fluid
      fill-height
      class="admin-login-container primary darken-1"
    >
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <v-card class="elevation-12 login-card mx-auto">
            <v-row no-gutters>
              <v-col
                cols="12"
                md="5"
                class="primary darken-2 d-flex align-center justify-center"
              >
                <div class="text-center pa-5">
                  <v-icon size="64" color="white">mdi-shield-account</v-icon>
                  <h2 class="white--text mt-4">Admin Portal</h2>
                </div>
              </v-col>
              <v-col cols="12" md="7">
                <v-card-text class="pa-6">
                  <h3 class="text-h5 font-weight-bold mb-4">Welcome Back</h3>
                  <v-form
                    @submit.prevent="handleLogin"
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="formData.username"
                      :rules="usernameRules"
                      label="Username"
                      prepend-inner-icon="mdi-account"
                      color="primary"
                      required
                      outlined
                      dense
                      :disabled="loading"
                    ></v-text-field>
                    <v-text-field
                      v-model="formData.password"
                      :rules="passwordRules"
                      label="Password"
                      prepend-inner-icon="mdi-lock"
                      :type="showPassword ? 'text' : 'password'"
                      color="primary"
                      required
                      outlined
                      dense
                      :disabled="loading"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <v-btn
                      block
                      color="primary"
                      class="mt-4"
                      :disabled="!valid || loading"
                      type="submit"
                      elevation="2"
                      :loading="loading"
                    >
                      Login
                    </v-btn>
                  </v-form>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",

  data() {
    return {
      valid: true,
      formData: {
        username: "",
        password: "",
      },
      showPassword: false,
      snackbar: false,
      snackbarText: "",
      snackbarColor: "",
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },

  computed: {
    ...mapGetters("auth", ["loading", "error"]),
  },

  methods: {
    ...mapActions("auth", ["login"]),

    async handleLogin() {
      if (this.$refs.form.validate()) {
        try {
          await this.login(this.formData);
        } catch (error) {

          console.log(error)
          this.showSnackbar(
            error.response?.data?.message || "Login failed",
            "error"
          );
        }
      }
    },

    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },

  created() {
    if (this.$store.getters["auth/isAuthenticated"]) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.admin-login-wrapper {
  display: flex;
  align-items: center;
  min-height: 100vh;
}
.admin-login-container {
  background-color: var(--v-primary-darken1) !important;
}
.login-card {
  overflow: hidden;
  max-width: 800px;
}
</style>
