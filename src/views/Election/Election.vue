<template>
  <Layout>
    <div class="p-5 mb-6">
      <div class="border-b border-gray-200 mb-5 relative">
        <h1 class="py-5 transition text-xl font-bold">Election</h1>
        <div class="absolute right-0 flex top-4 flex">
          <button
            @click="handleAccreditation(true)"
            class="
              relative
              w-full
              mb-2
              flex
              justify-center
              bg-green-500
              text-gray-100
              p-3
              rounded-lg
              tracking-wide
              font-bold
              focus:outline-none
              focus:shadow-outline
              hover:bg-green-600
              cursor-pointer
              transition
              ease-in
              duration-300
            "
          >
            Start Accreditation
          </button>
        </div>
      </div>
      <div class="">
        <div class="flex mb-6 space-x-5">
          <div class="w-1/2">
            <div class="bg-white p-4">
              <label
                class="mr-2 block text-gray-700 text-sm font-bold mb-2"
                for="title"
              >
                Title
              </label>
              <p>{{ election.title }}</p>
            </div>
          </div>
          <div class="w-1/2">
            <div class="bg-white p-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="candidates"
              >
                Candidates
              </label>
              <p>{{ election.candidates.length }}</p>
            </div>
          </div>
        </div>
        <div class="mb-6 bg-white p-4">
          <label
            class="mr-2 block text-gray-700 text-sm font-bold mb-2"
            for="desp"
          >
            Description
          </label>
          <p>{{ election.description }}</p>
        </div>
        <div class="mb-6 bg-white p-4">
          <label
            class="mr-2 block text-gray-700 text-sm font-bold mb-2"
            for="desp"
          >
            Accreditation
          </label>
          <div class="flex py-3">
            <div class="w-1/2">
              <h2 class="text-sm font-bold text-gray-700">Start Date</h2>
              <p class="text-gray-700 text-base">
                {{ election.accreditation_at.start }}
              </p>
            </div>
            <div class="w-1/2">
              <h2 class="text-sm font-bold text-gray-700">End Date</h2>
              <p class="text-gray-700 text-base">
                {{ election.accreditation_at.end }}
              </p>
            </div>
          </div>
        </div>
        <div class="mb-6 bg-white p-4">
          <label
            class="mr-2 block text-gray-700 text-sm font-bold mb-2"
            for="title"
          >
            Public key (Base58)
          </label>
          <p class="break-words py-2 text-sm">{{ election.pubkey }}</p>
        </div>
        <div class="mb-6 bg-white p-4">
          <label
            class="mr-2 block text-gray-700 text-sm font-bold mb-2"
            for="desp"
          >
            Election
          </label>

          <div class="flex py-3">
            <div class="w-1/2">
              <h2 class="text-sm font-bold text-gray-700">Start Date</h2>
              <p class="text-gray-700 text-base">
                {{ election.vote_at.start }}
              </p>
            </div>
            <div class="w-1/2">
              <h2 class="text-sm font-bold text-gray-700">End Date</h2>
              <p class="text-gray-700 text-base">
                {{ election.vote_at.start }}
              </p>
            </div>
          </div>
        </div>

        <div class="w-1/2">
          <div class="bg-white p-4">
            <label
              class="mr-2 block text-gray-700 text-sm font-bold mb-2"
              for="title"
            >
              Phase
            </label>
            <p
              class="
                py-2
                px-10
                rounded-full
                inline-block
                text-sm
                font-bold
                text-center
              "
              :class="phase(election)"
            >
              {{ election.phase }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <AccreditationModal
      @close="handleAccreditation(false)"
      :isVisible="isAcModalVisible"
    />
  </Layout>
</template>
<script>
import Layout from "./components/layout";
import { AccreditationModal } from "@/components/Modals";
import { getElection } from "@/api";
export default {
  name: "election",
  components: {
    Layout,
    AccreditationModal,
  },
  data() {
    return {
      isAcModalVisible: false,
      election: {
        title: "",
        description: "",
        accreditation_at: {
          start: "",
          end: "",
        },
        candidates: [],
        vote_at: {
          start: "",
          end: "",
        },
      },
    };
  },
  methods: {
    phase(election) {
      return election.phase === "accreditation"
        ? "bg-yellow-300"
        : election.phase === "initial"
        ? "bg-gray-200"
        : "bg-green-500";
    },
    handleAccreditation(value) {
      this.isAcModalVisible = value;
    },
  },
  mounted() {
    getElection(this.$route.params.election)
      .then((response) => {
        this.election = response.data.data;
        console.log(this.election);
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
};
</script>

<style lang="scss" scoped>
</style>

