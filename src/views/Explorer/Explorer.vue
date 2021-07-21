<template>
  <Layout>
    <div class="border-b border-gray-200 mb-10 relative">
      <h1 class="py-5 transition text-xl font-bold">
        <i class="uil uil-database text-xl"></i> Blockchain Explorer
      </h1>
    </div>
    <div class="bg-white text-sm relative overflow-scroll mb-8">
      <div
        class="
          rounded-t-xl
          overflow-scroll
          bg-gradient-to-r
          from-emerald-50
          to-teal-100
          p-10
          max-w-screen-2xl
        "
      >
        <table class="">
          <thead>
            <tr>
              <th class="p-2 text-emerald-600">S/N</th>
              <th class="p-2 text-emerald-600">Hash (Base64)</th>
              <th class="p-2 text-emerald-600">Transactions (Base64)</th>
              <th class="text-emerald-600">TxCount</th>
              <th class="text-emerald-600">PrevHash (Base64)</th>
              <th class="text-emerald-600">Height</th>
              <th class="text-emerald-600">MerkleRoot (Base64)</th>
              <th class="text-emerald-600">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(block, i) in blockchain" :key="block.hash">
              <td
                class="
                  p-2
                  border border-emerald-500
                  text-emerald-600
                  font-medium
                "
              >
                {{ i + 1 }}
              </td>
              <td
                class="
                  p-2
                  border border-emerald-500
                  text-emerald-600
                  font-medium
                "
              >
                {{ block.hash }}
              </td>
              <td
                class="
                  border
                  p-4
                  bg-blue-100
                  border-emerald-500
                  text-emerald-600
                  font-medium
                "
              >
                <strong>ID:</strong> {{ block.transactions[0].id }} <br />
                <strong>Election Pubkey:</strong>
                {{ block.transactions[0].election_pubkey }}<br />
                <strong>Nonce:</strong> {{ block.transactions[0].nonce }} <br />
                <strong>Tx Type:</strong> {{ block.transactions[0].type }}
              </td>

              <td
                class="
                  p-2
                  border border-emerald-500
                  text-emerald-600
                  font-medium
                "
              >
                {{ block.tx_count }}
              </td>
              <td
                class="
                  p-2
                  border border-emerald-500
                  text-emerald-600
                  font-medium
                "
              >
                {{ block.prev_hash }}
              </td>
              <td
                class="
                  p-2
                  border border-emerald-500
                  text-emerald-600
                  font-medium
                "
              >
                {{ block.height }}
              </td>
              <td
                class="
                  p-2
                  border border-emerald-500
                  text-emerald-600
                  font-medium
                "
              >
                {{ block.merkle_root }}
              </td>
              <td
                class="
                  p-2
                  border border-emerald-500
                  text-emerald-600
                  font-medium
                "
              >
                {{ block.timestamp }}
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
import { getBlockchain } from "@/api";

export default {
  name: "groups",
  components: {
    Layout,
  },
  data() {
    return {
      blockchain: [],
    };
  },
  mounted() {
    getBlockchain()
      .then((response) => {
        this.blockchain = response.data.data;
        console.log(this.blockchain);
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
};
</script>

<style>
</style>