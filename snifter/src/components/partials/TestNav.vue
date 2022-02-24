<template>
  <div class="primary-header logo">
    <img src="../../assets/logo3.png" />
  </div>
  <ul id="primary-navigation" class="primary-navigation flex">
    <li class="active">
      <router-link to="/about">
        <span aria-hidden="true">01</span>About
      </router-link>
    </li>
    <li class="active">
      <router-link to="/news">
        <span aria-hidden="true">02</span>News
      </router-link>
    </li>
    <li class="active">
      <router-link to="/browse">
        <span aria-hidden="true">03</span>Browse
      </router-link>
    </li>
    <li class="active">
      <router-link to="/search">
        <span aria-hidden="true">04</span>Search
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TestNav",
  props: {
    active: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="css" scoped>
.primary-navigation {
  list-style: none;
  margin: 0;
  padding: 0;
}
.flex {
  display: flex;
  gap: var(--gap, 1rem);
}
.logo {
  margin: 2rem;
  width: 40px;
  height: 40px;
}
.primary-header {
  align-items: center;
  justify-content: space-between;
}
</style>
