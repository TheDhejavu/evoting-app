<template>
  <Layout title="Candidates">
     <div class=" p-5 mb-6">
       <div class="border-b border-gray-200 mb-5 relative">
          <h1 class="py-5 transition text-xl font-bold">Cast Vote</h1>
       </div>
          
      <div class="flex flex-wrap">
        
        <div class="w-1/3" v-for="candidate in election.candidates" :key="candidate.id">
          <div class="m-3">
            <div class="bg-white shadow-md rounded-lg p-4 pb-0 flex flex-col justify-between leading-normal">
              <div class="mb-0">
                <p class="text-sm py-1 text-xl uppercase font-bold pl-2 mb-5 text-center  leading-40">PDP</p>
              
                <div class="">
                  
                  <span class="text-gray-900 text-xs">Fullname: </span>
                  <h2 class="text-sm py-1 text-4xl font-extrabold"> {{candidate.full_name}}</h2>
                  <div class="">
                    <div class="">
                      <span class="text-gray-900 text-xs">Position: </span>
                      <h2 > {{candidate.position}} </h2>
                    </div>
                    <div class="pt-5">
                      <span class="text-gray-900 text-xs">Political Party: </span>
                      <p> {{candidate.political_party.name}}</p>
                    </div>
                  </div>
                  <button class="mt-10 relative w-full mb-5 flex justify-center bg-green-500 text-gray-100 p-4 px-10 rounded-lg tracking-wide
                                  font-semibold  focus:outline-none focus:shadow-outline hover:bg-green-600 shadow-md cursor-pointer transition ease-in duration-300">
                      
                      <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg class="h-5 w-5 text-green-400  group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                      </span>
                      Vote
                  </button>
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
import  { getElection } from "@/api";

export default {
    name: "candidate",
    components: {
      Layout
    },
    data() {
    return {
      election: {
        candidates: [],
      }
    }
  },
    mounted(){
    getElection(this.$route.params.election).then(response=> {
        this.election = response.data.data
      }).catch(error=>{
        console.log(error.response)
      })
  }
}
</script>

<style>

</style>