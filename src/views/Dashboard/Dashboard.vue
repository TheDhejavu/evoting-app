<template>
  <Layout title="Dashboard">
      <div class="border-b border-gray-200 mb-10 relative">
          <h1 class="py-5 transition text-xl font-bold"> <i class="uil uil-create-dashboard text-xl"></i> Dashboard</h1>
      </div>
      <div class="flex flex-wrap">
        <div class="w-1/2">
          <div class="m-3">
             <a href="http://localhost:8081" target="_blank" class="bg-green-500  block hover:bg-green-700 shadow-lg cursor-pointer transition ease-in duration-300 bg-white shadow-md rounded-lg p-4 pb-0 flex flex-col justify-between leading-normal">
              <div class="mb-2 p-5 pb-12">
                <p class="text-sm text-white-600 flex items-center">
                  <svg class="fill-current text-white-100 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  eVoting.app
                </p>
               
                <h1 class="text-white-600 uppercase leading-loose text-4xl  font-extrabold"> Digital Identity</h1>
                 <div class="text-white-900 font-medium py-2 mb-2">Visit your government issued digital identity</div>
              </div>
             </a>
          </div>
        </div>
        <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2" v-for="election in elections" :key="election.id">
          <div class="m-3">
            <router-link :to="`/elections/${election.id}/cast-vote`" class="block pb-7 hover:bg-green-500 shadow-lg cursor-pointer transition ease-in duration-300 bg-white shadow-md rounded-lg p-4 pb-0 flex flex-col justify-between leading-normal">
              <div class="mb-2 p-5">
                <div
                    class="text-sm rounded-md flex"
                  >
                    <img :src="election.country.flag" class="w-8 pr-1"/> 
                    <p  class="px-2 pt-1">{{election.country.name}}</p>
                </div>
                <p class="block text-green-700 pt-3 text-xs font-bold capitalize"> {{election.phase}} Phase </p>
                <div class="text-gray-900 font-extrabold text-3xl py-2 ">{{election.title}}</div>
                 <!-- <span class="inline pt-5 text-gray-500 text-sm leading-8 font-medium"> (10 candidates) </span> -->
                <p class="text-gray-700 text-base pt-2 "> {{election.description}}</p>
      
              </div>
              
            </router-link>
          </div>
        </div>
      </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Default";
import  { getElections } from "@/api";


export default {
    name: "dashboard",
    components: {
      Layout
    },
    data()  {
      return {
        elections: []
      }
    },
    mounted() {
      getElections().then(response=> {
        this.elections = response.data.data
        console.log(this.elections)
      }).catch(error=>{
        console.log(error.response)
      })
    },
}
</script>

<style>

</style>