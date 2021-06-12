<template>
  <Layout>
      <div class="flex max-w-6xl m-auto">
        <nav class="w-1/5 pt-8">
          <ul class="px-5">
              <li 
                  class="transition text-base font-extrabold text-gray-500 hover:text-gray-900"
              >
                  <router-link to="/elections/hello" class=" px-3 py-3  block">Election </router-link>
              </li>
              <li
                  class="transition text-base font-extrabold text-gray-500 hover:text-gray-900"
              >
                  <router-link to="/elections/hello/cast-vote" class="px-3 py-3 block">Cast Vote</router-link>
              </li>
              <li
                  class="transition text-base font-extrabold text-gray-500 hover:text-gray-900"
              >
                  <router-link to="/elections/hello/results" class="px-3 py-3 block">Results</router-link>
              </li>
          </ul>
        </nav>
      <div class="w-4/5 ">
        <slot/>
      </div>
    </div>
  </Layout>
</template>
<script>
import Layout from "@/layouts/Default";

export default {
  name: "dashboard",
  components: {
    Layout,
  },
}
</script>

<style lang="scss" scoped>
nav {
  .active {
    @apply bg-gray-300  text-black;
  }
}
</style>

