<template>
  <div class="login-page">
    <div class="background-animation"></div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6" xl="5">
          <v-card elevation="10" class="login-card mx-auto">
            <v-row no-gutters>
              <v-col cols="12" md="5" class="login-image d-none d-md-flex">
                <v-img
                  src="https://source.unsplash.com/random/800x1200?voting"
                  gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
                  class="fill-height"
                >
                  <div
                    class="image-overlay d-flex flex-column justify-center align-center text-center px-4"
                  >
                    <h2 class="text-h4 font-weight-bold white--text mb-3">
                      GITVote
                    </h2>
                    <p class="white--text">
                      Empowering your voice in the democratic process
                    </p>
                  </div>
                </v-img>
              </v-col>
              <v-col cols="12" md="7">
                <v-card-text class="pa-8">
                  <h1
                    class="text-h4 font-weight-bold mb-6 primary--text text-center"
                  >
                    Login
                  </h1>
                  <v-form @submit.prevent="submitLogin">
                    <v-text-field
                      v-model="studentId"
                      label="Student ID"
                      prepend-inner-icon="mdi-account"
                      outlined
                      dense
                      required
                    ></v-text-field>
                    </v-text-field>
                    <v-text-field
                      v-model="password"
                      label="Password"
                      type="password"
                      prepend-inner-icon="mdi-lock"
                      outlined
                      dense
                      required
                    ></v-text-field>
                    <!-- <v-text-field
                      v-model="email"
                      label="Email"
                      type="email"
                      prepend-inner-icon="mdi-email"
                      outlined
                      dense
                      required
                    ></v-text-field> -->
                    <!-- <v-expand-transition>
                      <v-text-field
                        v-if="showOtp"
                        v-model="otp"
                        label="OTP"
                        type="number"
                        prepend-inner-icon="mdi-lock"
                        outlined
                        dense
                        required
                      ></v-text-field>
                    </v-expand-transition> -->
                    <v-btn
                      color="primary"
                      type="submit"
                      block
                      large
                      :loading="loading"
                      class="mt-6"
                      elevation="2"
                    >
                      Login
                    </v-btn>
                  </v-form>
                  <div class="mt-6 text-center">
                    <v-btn
                      text
                      color="secondary"
                      @click="$router.push('/election/view')"
                      class="text-capitalize"
                    >
                      <v-icon left>mdi-arrow-left</v-icon>
                      Back to Home
                    </v-btn>
                  </div>
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
import { mapActions } from "vuex";

export default {
  data: () => ({
    studentId: "",
    email: "",
    otp: "",
    showOtp: false,
    loading: false,
    error: "",
    password: ""
  }),
  methods: {
    ...mapActions("student", ["login"]),
    async submitLogin() {
      this.loading = true;
      this.error = "";

      try {
        const result = await this.login({
          studentId: this.studentId,
          password: this.password,
          // email: this.email,
          // otp: this.showOtp ? this.otp : null,
        });

        console.log(result)
        if (result.error) {
          this.error = result.error;
          alert("Invalid Student ID or password")
          // if (this.error === "OTP has expired") {
          //   this.showOtp = false;
          //   this.otp = "";
          // }
        } else {
          this.$root.$emit("show-snackbar", result.message);
          if (result.showOtp) {
            this.showOtp = true;
          } else {
            this.$router.push("/election/portal");
          }
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #f0f4f8;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.login-card {
  border-radius: 16px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
  margin: 2rem auto;
}

.login-image {
  position: relative;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom right,
    rgba(19, 84, 122, 0.8),
    rgba(128, 208, 199, 0.8)
  );
}

.v-text-field {
  margin-bottom: 16px;
}

.v-btn {
  text-transform: none;
  letter-spacing: 0.5px;
  font-weight: 600;
}

/* Ensure the container takes full height */
.v-application--wrap {
  min-height: 100vh;
}
</style>
