<template>
   <div class="admin-login-wrapper primary darken-1">
    <v-container fluid fill-height class="admin-login-container primary darken-1">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card class="elevation-12 login-card mx-auto" >
          <v-row no-gutters>
            <v-col cols="12" md="5" class="primary darken-2 d-flex align-center justify-center">
              <div class="text-center pa-5">
                <v-icon size="64" color="white">mdi-shield-account</v-icon>
                <h2 class="white--text mt-4">Admin Portal</h2>
                <p class="white--text mt-2">Secure access to your dashboard</p>
              </div>
            </v-col>
            <v-col cols="12" md="7">
              <v-card-text class="pa-6">
                <h3 class="text-h5 font-weight-bold mb-4">Welcome Back</h3>
                <v-form @submit.prevent="login" ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    prepend-inner-icon="mdi-email"
                    type="email"
                    color="primary"
                    required
                    outlined
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    prepend-inner-icon="mdi-lock"
                    :type="showPassword ? 'text' : 'password'"
                    color="primary"
                    required
                    outlined
                    dense
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                  <v-btn
                    block
                    color="primary"
                    class="mt-4"
                    :disabled="!valid"
                    type="submit"
                    elevation="2"
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
   </div>
 
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      email: "",
      password: "",
      showPassword: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        if (this.email === "admin@admin.com" && this.password === "admin") {
          localStorage.setItem("adminLoggedIn", "true");
          this.$router.push({ name: "Dashboard" });
        } else {
          alert('Invalid email or password')
        }
      }
    },
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