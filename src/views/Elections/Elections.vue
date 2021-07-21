<template>
  <Layout title="Elections">
    <div class="border-b border-gray-200 mb-10 relative">
      <h1 class="py-5 transition text-xl font-bold">
        <i class="uil uil-user-check text-xl"></i> Elections
      </h1>
    </div>
    <div class="bg-white relative overflow-hidden mb-8">
      <div
        class="
          rounded-t-xl
          overflow-scroll
          bg-gradient-to-r
          from-emerald-50
          to-teal-100
          p-10
        "
      >
        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-6 py-4 text-emerald-600">S/N</th>
              <th class="w-1/4 px-6 py-4 text-emerald-600">Title</th>
              <th class="px-6 py-4 text-emerald-600">Despcription</th>
              <th class="px-6 py-4 text-emerald-600">Candidates</th>
              <th class="w-1/6 px-6 py-4 text-emerald-600">Phase</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="cursor-pointer hover:bg-gray-100 transition"
              @click="$router.push(`/elections/${election.id}`)"
              v-for="(election, i) in elections"
              :key="election.id"
            >
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
                {{ election.title }}
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
                {{ election.description }}
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
                {{ election.candidates.length }}
              </td>
              <td
                class="
                  cursor-pointer
                  px-2
                  py-4
                  hover:bg-gray-100
                  transition
                  border border-emerald-500
                  px-2
                  py-4
                  text-emerald-600
                  font-medium
                "
              >
                <span
                  class="
                    py-2
                    px-2
                    rounded-full
                    block
                    text-sm
                    font-bold
                    text-center
                  "
                  :class="phase(election.phase)"
                  >{{ electionPhase(election.phase) }} phase
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Layout>
</template>

<script>
import { getElections } from "@/api";
import Layout from "@/layouts/Default";
export default {
  name: "elections",
  components: {
    Layout,
  },
  data() {
    return {
      elections: [],
      phases:  {
        "voting_end": "voting end",
        "accreditation_end": "accreditation end",
      },
    };
  },
  methods: {
    phase(phase) {
      if(phase === "accreditation" || phase === "voting" )
        return "bg-green-300"

      if(phase === "accreditation_end" || phase === "voting_end")
        return "bg-red-300"

      return "bg-green-500";
    },
    electionPhase(phase){
      if(phase in this.phases) {
        return this.phases[phase]
      }

      return phase;
    },
  },
  mounted() {
    getElections()
      .then((response) => {
        this.elections = response.data.data;
        console.log(this.elections);
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
};
</script>

<style>
</style>