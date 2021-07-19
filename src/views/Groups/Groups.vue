<template>
  <Layout>
    <div class="border-b border-gray-200 mb-10 relative">
      <h1 class="py-5 transition text-xl font-bold">
        <i class="uil uil-user-circle text-xl"></i> Consensus Group
      </h1>
    </div>
    <div class="bg-white relative overflow-hidden mb-8">
      <div
        class="
          rounded-t-xl
          overflow-hidden
          bg-gradient-to-r
          from-emerald-50
          to-teal-100
          p-10
        "
      >
        <table class="table-auto">
          <thead>
            <tr>
              <th class="w-1/6 px-6 py-4 text-emerald-600">S/N</th>
              <th class="w-1/4 px-6 py-4 text-emerald-600">Name</th>
              <th class="w-1/2 px-6 py-4 text-emerald-600">
                Public Key (Base58)
              </th>
              <th class="w-1/4 px-6 py-4 text-emerald-600">Country</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(group, i) in groups" :key="group.id">
              <td
                class="
                  border border-emerald-500
                  px-6
                  py-4
                  text-emerald-600
                  font-medium
                "
              >
                {{ i + 1 }}
              </td>
              <td
                class="
                  border border-emerald-500
                  px-6
                  py-4
                  text-emerald-600
                  font-medium
                "
              >
                {{ group.name }}
              </td>
              <td
                class="
                  border border-emerald-500
                  px-6
                  py-4
                  text-emerald-600
                  font-medium
                  break-all
                "
              >
                {{ group.public_key }}
              </td>
              <td
                class="
                  cursor-pointer
                  bg-green-100
                  transition
                  flex
                  border border-emerald-500
                  px-4
                  py-8
                  text-emerald-600
                  font-medium
                "
              >
                <img :src="group.country.flag" class="w-8 pr-3" />
                {{ group.country.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Default";
import { getGroup } from "@/api";

export default {
  name: "groups",
  components: {
    Layout,
  },
  data() {
    return {
      groups: [],
    };
  },
  mounted() {
    getGroup()
      .then((response) => {
        this.groups = response.data.data;
        console.log(this.groups);
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
};
</script>

<style>
</style>