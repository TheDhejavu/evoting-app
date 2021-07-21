<template>
  <Layout title="Candidates">
    <div class="p-5 mb-6">
      <div class="border-b border-gray-200 mb-5 relative">
        <h1 class="py-5 transition text-xl font-bold flex">
          <!-- <img :src="election.country.flag" class="mr-5 w-8 pr-1" /> -->
          Cast Vote
        </h1>
      </div>

      <div class="flex flex-wrap">
        <div
          class="w-1/3"
          v-for="candidate in election.candidates"
          :key="candidate.id"
        >
          <div class="m-3">
            <div
              class="
                bg-white
                shadow-md
                rounded-lg
                p-4
                pb-0
                flex flex-col
                justify-between
                leading-normal
              "
            >
              <div class="mb-0">
                <p
                  class="
                    text-sm
                    py-1
                    text-xl
                    uppercase
                    font-bold
                    pl-2
                    mb-5
                    text-center
                    leading-40
                  "
                >
                  PDP
                </p>

                <div class="pb-10">
                  <span class="text-gray-900 text-xs">Fullname: </span>
                  <h2 class="text-sm py-1 text-4xl font-extrabold">
                    {{ candidate.full_name }}
                  </h2>
                  <div class="">
                    <div class="">
                      <span class="text-gray-900 text-xs">Position: </span>
                      <h2>{{ candidate.position }}</h2>
                    </div>
                    <div class="pt-5">
                      <span class="text-gray-900 text-xs"
                        >Political Party:
                      </span>
                      <p>{{ candidate.political_party.name }}</p>
                    </div>
                    <div class="pt-5 break-words">
                      <span class="text-gray-900 text-xs break-words"
                        >Public Key (Base68):
                      </span>
                      <p class="text-xs">{{ candidate.pubkey }}</p>
                    </div>
                  </div>

                  <button
                    v-if="canVote(election)"
                    :disabled="selectedCandidate !== ''"
                    @click="handleCastVote(candidate)"
                    class="
                      mt-10
                      relative
                      w-full
                      mb-5
                      flex
                      justify-center
                      bg-green-500
                      text-gray-100
                      p-4
                      px-10
                      rounded-lg
                      tracking-wide
                      font-extrabold
                      focus:outline-none
                      focus:shadow-outline
                      hover:bg-green-600
                      shadow-md
                      cursor-pointer
                      transition
                      ease-in
                      duration-300
                    "
                  >
                    <span
                      class="absolute left-0 inset-y-0 flex items-center pl-3"
                    >
                      <i class="uil uil-thumbs-up text-2xl"></i>
                    </span>
                    <loader
                      :loading="selectedCandidate === candidate.id"
                      size="16px"
                    ></loader>
                    <strong v-if="selectedCandidate === candidate.id"
                      >Casting....</strong
                    >
                    <span v-else>Vote</span>
                  </button>

                  <span
                    v-if="canVote(election) == false"
                    class="
                      py-2
                      px-2
                      mt-5
                      rounded-full
                      block
                      text-sm
                      font-bold
                      text-center
                    "
                    :class="phase(election.phase)"
                    >{{ electionPhase(election.phase) }} phase
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "./components/layout";
import { getElection, castBallot } from "@/api";
import Loader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "candidate",
  components: {
    Layout,
    Loader,
  },
  data() {
    return {
      election: {
        candidates: [],
      },
      selectedCandidate: "",
      message: "",
      phases:  {
        "voting_end": "voting end",
        "accreditation_end": "accreditation end",
      },
    };
  },
  mounted() {
   
    getElection(this.$route.params.election)
      .then((response) => {
        this.election = response.data.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
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
    handleCastVote(candidate) {
      this.$alertModal.show({
        title: "Cast vote",
        text: "Are you sure you want to vote for this candidate ? This action is irreversible.",
        confirmEnabled: true,
        onConfirm: () => {
          return this.CastVote(candidate);
        },
      });
    },
    CastVote(candidate) {
      this.selectedCandidate = candidate.id;
      
      return castBallot(this.election.id, {
        candidate: candidate.pubkey,
      })
        .then((response) => {
          console.log(response);
          var data = response.data.data;
          this.$swal({
            icon: 'success',
            title: '<strong><i class="uil uil-thumbs-up"></i> Successfully Voted</strong>',
            html:
              `You have successfully voted for your preferred candidate 
              <p class="text-xs text-left leading-6 bg-green-100 rounded-lg p-5 m-4">
                <strong>Name:</strong> ${data.full_name} <br/>
                <strong>Public key:</strong> ${data.pubkey} <br/>
                <strong>Political party:</strong> ${data.political_party.name}(${data.political_party.slug})
              </p>`,
            showCloseButton: true,
            focusConfirm: false,
          })
          return true;
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            this.message = error.response.data.message
          } else {
            this.message = "Whoops!! something went wrong";
          }
          this.$swal({
            icon: 'error',
            title: `<strong>Voting failed</strong>`,
            html:
              `${this.message}`,
            showCloseButton: true,
            focusConfirm: false,
          })

          return true;
        })
        .finally(() => {
          this.selectedCandidate = "";
        });
    },
    canVote(election) {
      return election.phase === "voting"
    },
  },
};
</script>

<style lang="scss">
button:disabled {
  box-shadow: none;
  opacity: 0.5;
  &:hover {
    cursor: not-allowed;
  }
}
</style>