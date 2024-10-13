
# components/core/Breadcrumbs.vue
<template>
  <v-breadcrumbs :items="breadcrumbs">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :to="item.to"
        :disabled="item.disabled"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  computed: {
    breadcrumbs() {
      const breadcrumbs = [];
      const paths = this.$route.path.split('/').filter(Boolean);
      let fullPath = '';

      breadcrumbs.push({
        text: 'Home',
        disabled: false,
        to: '/',
      });

      paths.forEach((path, index) => {
        fullPath += `/${path}`;
        breadcrumbs.push({
          text: this.$route.name || path.charAt(0).toUpperCase() + path.slice(1),
          disabled: index === paths.length - 1,
          to: fullPath,
        });
      });

      return breadcrumbs;
    },
  },
};
</script>