<template>
  <Modal :isVisible="isVisible" classNames="alert-modal" @close="close">
    <header class="modal-header">
      <h4 class="title text-center text-2xl font-bold" v-if="title">
        {{ title }}
      </h4>
      <p class="message text-center p-6 text-sm leading-6" v-if="text">
        {{ text }}
      </p>
    </header>
    <footer class="modal-footer text-center">
      <div class="modal-footer__panel to-right flex">
        <button
          class="
            relative
            mb-2
            mr-10
            flex
            justify-center
            bg-green-500
            text-gray-100
            p-4
            px-10
            rounded-lg
            tracking-wide
            font-semibold
            focus:outline-none
            focus:shadow-outline
            hover:bg-green-600
            cursor-pointer
            transition
            ease-in
            duration-300
          "
          kind="filled"
          :loading="isLoading"
          @click="confirm"
        >
          Confirm
        </button>
        <button
          class="
            relative
            mb-2
            mr-10
            flex
            justify-center
            bg-red-300
            p-4
            px-10
            rounded-lg
            tracking-wide
            font-semibold
            focus:outline-none
            focus:shadow-outline
            hover:bg-red-600
            hover:text-white
            cursor-pointer
            transition
            ease-in
            duration-300
          "
          kind="filled"
          @click="close"
        >
          Cancel
        </button>
      </div>
    </footer>
    <OverlayLoader :visible="isLoading" />
  </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import OverlayLoader from "@/components/OverlayLoader/OverlayLoader";
export default {
  name: "alert",
  components: {
    Modal,
    OverlayLoader,
  },
  data() {
    return {
      title: null,
      text: null,
      confirmEnabled: true,
      isLoading: false,
      onConfirm: () => {},
      isVisible: false,
    };
  },
  methods: {
    close() {
      // method for closing modal
      this.isVisible = false;
    },
    async confirm() {
      this.isLoading = true;
      // we must check if this.onConfirm is function
      if (typeof this.onConfirm === "function") {
        // run passed function and then close the modal
        const confirmed = await this.onConfirm();
        this.isLoading = false;
        if (confirmed) {
          this.close();
        }
      } else {
        // we only close the modal
        this.close();
      }
    },

    show(params) {
      if (!this.$parent) {
        this.$mount();
        document.body.appendChild(this.$el);
      }
      setTimeout(() => {
        // making dialog visible
        this.isVisible = true;
        // setting title and text
        this.title = params.title;
        this.text = params.text;
        this.confirmEnabled = params.confirmEnabled;
        // setting callback function
        this.onConfirm = params.onConfirm;
      }, 100);
    },
  },
};
</script>

<style lang='scss'>
.alert-modal {
  max-width: 400px;
  top: 200px !important;
  .modal-header {
    padding: 30px 5px !important;
  }
}
</style>
