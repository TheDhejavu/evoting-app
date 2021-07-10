<template>
  <Layout>
      <div class="p-5 mb-6">
        <div class="border-b border-gray-200 mb-5 relative">
          <h1 class="py-5 transition text-xl font-bold">Election</h1>
              <div class="absolute right-0 flex top-4  flex">
                <button class="relative w-full mb-2 flex justify-center bg-green-500 text-gray-100 p-3 px-10 rounded-lg tracking-wide
                                      font-bold  focus:outline-none focus:shadow-outline hover:bg-green-600 shadow-md cursor-pointer transition ease-in duration-300">
                          
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-green-400  group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </span>
                Start Accreditation
            </button>
          </div>
       </div>
       <div class="">
         
         <div class="flex mb-6 space-x-5">
            <div class="w-1/2">
              <div class="bg-white p-4">
                <label class="mr-2 block text-gray-700 text-sm font-bold mb-2" for="title">
                  Title
                </label>
                <p>{{election.title}}</p>
              </div>
            </div>
            <div class="w-1/2">
              <div class="bg-white p-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="candidates">
                  Candidates
                </label>
                <p> {{election.candidates.length}} </p>
              </div>
            </div>
          </div>
          <div class="mb-6 bg-white p-4">
              <label class="mr-2 block text-gray-700 text-sm font-bold mb-2" for="desp">
                Description
              </label>
              <p>{{election.description}}</p>
          </div>
          <div class="mb-6 bg-white p-4">
              <label class="mr-2 block text-gray-700 text-sm font-bold mb-2" for="desp">
                Accreditation
              </label>
               <div class="flex py-3"> 
                  <div class="w-1/2">
                    <h2 class="text-sm  font-bold text-gray-700"> Start Date </h2>
                    <p class="text-gray-700 text-base">{{election.accreditation_at.start}}</p>
                  </div>
                  <div class="w-1/2">
                    <h2 class="text-sm font-bold text-gray-700"> End Date </h2>
                    <p class="text-gray-700 text-base">{{election.accreditation_at.end}} </p>
                  </div>
              </div>
  
          </div>
          <div class="mb-6 bg-white p-4">
              <label class="mr-2 block text-gray-700 text-sm font-bold mb-2" for="desp">
                Election
              </label>
             
              <div class="flex py-3"> 
                  <div class="w-1/2">
                    <h2 class="text-sm  font-bold text-gray-700"> Start Date </h2>
                    <p class="text-gray-700 text-base">{{election.vote_at.start}} </p>
                  </div>
                  <div class="w-1/2">
                    <h2 class="text-sm font-bold text-gray-700"> End Date </h2>
                    <p class="text-gray-700 text-base">{{election.vote_at.start}}  </p>
                  </div>
              </div>
          </div>
          <div class="w-1/2">
              <div class="bg-white p-4">
                <label class="mr-2 block text-gray-700 text-sm font-bold mb-2" for="title">
                  Phase
                </label>
                <p class="py-2 px-10 rounded-full inline-block text-sm font-bold text-center" :class="phase(election)">{{election.phase}}</p>
              </div>
            </div>
       </div>
    </div>
  </Layout>
</template>
<script>
import Layout from "./components/layout";
import  { getElection } from "@/api";
export default {
  name: "election",
  components: {
    Layout,
  },
  data() {
    return {
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
        }
      }
    }
  },
  methods: {
    phase(election) {
      return election.phase === 'accreditation' ? 'bg-yellow-300': election.phase === 'initial' ? 'bg-gray-200' : 'bg-green-500'
    }
  },
  mounted(){
    getElection(this.$route.params.election).then(response=> {
        this.election = response.data.data
        console.log(this.election)
      }).catch(error=>{
        console.log(error.response)
      })
  }
}
</script>

<style lang="scss" scoped>

</style>

