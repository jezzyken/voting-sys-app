<template>
  <router-view />
</template>

<script>
export default {
  name: "App",

  async created() {
    console.log("im always called")
    await this.checkElectionStatus();
  },

  methods: {
    async checkElectionStatus() {
      try {
        await this.$http.get("/election");
      } catch (error) {
        console.error("Error checking election status:", error);
      }
    },
  },

  // mounted() {
  //   this.intervalId = setInterval(this.checkElectionStatus, 60000);
  // },

  // beforeDestroy() {
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }
  // },
};
</script>
