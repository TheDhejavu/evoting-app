<template>
  <Layout page="auth">
    <!-- component -->

    <div
      class="
        relative
        flex
        items-center
        justify-center
        py-12
        px-4
        sm:px-6
        lg:px-8
        bg-no-repeat bg-cover
        relative
        items-center
      "
    >
      <div
        class="max-w-md py-20 w-full space-y-8 p-10 bg-white rounded-xl z-10"
      >
        <img class="mx-auto h-12 w-auto" src="@/assets/logo.svg" alt="Logo" />
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Please sign in with your identity
          </p>
        </div>

        <div class="flex items-center justify-center space-x-2">
          <span class="h-px w-16 bg-gray-300"></span>
          <span class="text-gray-500 font-normal">Voting Application</span>
          <span class="h-px w-16 bg-gray-300"></span>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST">
          <div class="relative">
            <label class="text-sm font-bold text-gray-700 tracking-wide"
              >11-DID Digits</label
            >
            <input
              class="
                w-full
                text-base
                py-2
                border-b border-gray-300
                focus:outline-none
                focus:border-green-500
              "
              type="text"
              placeholder="11-DID Digits"
              v-model="formControls.digits"
            />
          </div>
          <div class="mt-8 content-center">
            <label class="text-sm font-bold text-gray-700 tracking-wide">
              Password
            </label>
            <input
              class="
                w-full
                content-center
                text-base
                py-2
                border-b border-gray-300
                focus:outline-none
                focus:border-green-500
              "
              type="password"
              placeholder="Enter your password"
              v-model="formControls.password"
            />
          </div>
          <div>
            <button
              :disabled="isLoading"
              @click="handleSubmit"
              type="submit"
              class="
                w-full
                flex
                justify-center
                bg-green-500
                text-gray-100
                p-4
                rounded-full
                tracking-wide
                font-semibold
                focus:outline-none
                focus:shadow-outline
                hover:bg-green-600
                shadow-lg
                cursor-pointer
                transition
                ease-in
                duration-300
              "
            >
              <loader :loading="isLoading" size="16px"></loader>
              <span v-if="!isLoading">Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "../../layouts/Default";
import { loginIdentity } from "@/api";
import Loader from "vue-spinner/src/PulseLoader.vue";
import { setAuthToken } from "@/helpers/auth";

export default {
  name: "Login",
  components: {
    Layout,
    Loader,
  },
  data() {
    return {
      formControls: {
        digits: "",
        passowrd: "",
      },
      isLoading: false,
    };
  },
  methods: {
    handleSubmit() {
      this.isLoading = true;
      loginIdentity(this.formControls)
        .then((response) => {
          this.$store.commit("SET_IDENTITY", response.data.data.identity);
          this.$toaster.success(response.data.message);
          setAuthToken(response.data.data.access_token);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response) {
            if (typeof error.response.data.data !== "undefined") {
              for (const key in error.response.data.data) {
                this.$toaster.error(error.response.data.data[key]);
                break;
              }
            } else {
              this.$toaster.error(error.response.data.message);
            }
          } else {
            this.$toaster.error("Whoops!! something went wrong");
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-button:disabled {
  @apply opacity-70 cursor-not-allowed;
  &:hover {
    @apply bg-green-600;
  }
}
</style>