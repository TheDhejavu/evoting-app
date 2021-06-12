<template>
  <Layout title="Elections">
      <div class="border-b border-gray-200 mb-10 relative">
          <h1 class="py-5 transition text-xl font-bold"> <i class="uil uil-user-check text-xl"></i>  Elections</h1>
       </div>
      <div class="bg-white relative overflow-hidden mb-8">
        <div class="rounded-t-xl overflow-scroll bg-gradient-to-r from-emerald-50 to-teal-100 p-10">
          <table class="table-auto">
            <thead>
              <tr>
                <th class="px-6 py-4 text-emerald-600">S/N</th>
                <th class="w-1/4 px-6 py-4 text-emerald-600">Title</th>
                <th class="w-1/3 px-6 py-4 text-emerald-600">Despcription</th>
                <th class="px-6 py-4 text-emerald-600">Candidates/Parties</th>
                <th class="px-6 py-4 text-emerald-600">Phase</th>
              </tr>
            </thead>
            <tbody>
              <tr class="cursor-pointer hover:bg-gray-100 transition " @click="$router.push('/elections/hello')">
                <td class="border border-emerald-500 px-6 py-4 text-emerald-600 font-medium">1</td>
                <td class="border border-emerald-500 px-6 py-4 text-emerald-600 font-medium">Nigeria Presidential Election</td>
                <td class="border border-emerald-500 px-6 py-4 text-emerald-600 font-medium">The general Presidential election of the republic of nigeria</td>
                 <td class="border border-emerald-500 px-6 py-4 text-emerald-600 font-medium">35</td>
                <td class="cursor-pointer px-6 py-4 hover:bg-gray-100 transition border border-emerald-500 px-2 py-4 text-emerald-600 font-medium"> <span class="bg-yellow-500 py-2 rounded-full block text-sm font-bold text-center">Accreditation phase </span></td>
              </tr>
              <tr class="bg-emerald-200 cursor-pointer hover:bg-gray-100 transition " @click="$router.push('/elections/hello/cast-vote')">
                <td class="border border-emerald-500 px-6 py-4 text-emerald-600 font-medium">2</td>
                <td class="border border-emerald-500 px-6 py-4 text-emerald-600 font-medium">Nigeria Presidential Election</td>
                <td class="border border-emerald-500 px-6 py-4 text-emerald-600 font-medium">The general Presidential election of the republic of nigeria</td>
                 <td class="border border-emerald-500 px-6 py-4 text-emerald-600 font-medium">11</td>
               <td class="cursor-pointer px-6 py-4 hover:bg-gray-100 transition border border-emerald-500 px-2 py-4 text-emerald-600 font-medium"> <span class="bg-gray-200 px-2 py-2 rounded-full block text-sm font-bold text-center">Start phase </span></td>
              </tr>
              <tr class="cursor-pointer hover:bg-gray-100 transition " @click="$router.push('/elections/hello/cast-vote')">
                <td class="border border-emerald-500 px-6 py-4 text-emerald-600 font-medium">1</td>
                <td class="border border-emerald-500 px-6 py-4 text-emerald-600 font-medium">Nigeria Presidential Election</td>
                <td class="border border-emerald-500 px-6 py-4 text-emerald-600 font-medium text-sm">The general Presidential election of the republic of nigeria</td>
                <td class="border border-emerald-500 px-6 py-4 text-emerald-600 font-medium">10</td>
                <td class="cursor-pointer px-6 py-4 hover:bg-gray-100 transition border border-emerald-500 px-2 py-4 text-emerald-600 font-medium"> <span class="bg-green-500 px-2 py-2 rounded-full block text-sm font-bold text-center">Voting phase </span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Default";
export default {
    name: "elections",
    components: {
      Layout
    }
}
</script>

<style>

</style>