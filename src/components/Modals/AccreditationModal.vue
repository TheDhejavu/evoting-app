<template>
  <div>
    <Modal
      :isVisible="isVisible"
      @close="handleCloseModal"
      classNames="accreditation-modal py-2"
    >
      <div class="p-8 relative">
        <h4 class="py-3 text-xl font-bold text-center">
          Accrediation using <br />Biometric Facial Recognition 🔑
        </h4>
        <div class="bg-white shadowmd rounded px-5 pb-8 mb-4">
          <!-- <h1 class="text-xl font-bold flex">Biometric Facial Recognition</h1> -->
          <p class="opacity-50 text-sm py-5 max-w-lg">
            Click the button below to start facial capturing to verify your
            digital identity. This process is secure.
          </p>
          <div class="camera relative">
            <button
              @click="init()"
              v-show="!cameraEnabled"
              class="
                absolute
                z-50
                top-1/2
                text-center
                left-1/4
                transition-group
                w-1/2
                py-4
                px-4
                border border-transparent
                font-extrabold
                rounded-md
                text-white
                bg-green-600
                hover:bg-green-700
                focus:outline-none
                outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-green-500
              "
            >
              <i class="uil uil-webcam"></i>
              Enable Camera
            </button>
            <video autoplay class="feed"></video>
            <button
              class="snap"
              v-on:click="takePicture"
              v-show="cameraEnabled"
            >
              <i class="uil uil-capture text-4xl"></i>
            </button>
          </div>
          <div class="pictures flex flex-wrap" ref="pictures"></div>
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          @click="handleSubmit"
          class="
            transition
            group
            enroll-button
            relative
            w-full
            flex
            justify-center
            py-4
            px-4
            border border-transparent
            font-extrabold
            rounded-md
            text-white
            bg-green-600
            hover:bg-green-700
            focus:outline-none
            text-lg
            focus:ring-2 focus:ring-offset-2 focus:ring-green-500
          "
        >
          <loader :loading="isLoading" size="16px"></loader>
          <span v-if="!isLoading">Accredite</span>
        </button>
      </div>
      <OverlayLoader :visible="isLoading" />
    </Modal>
  </div>
</template>

<script>
import OverlayLoader from "@/components/OverlayLoader/OverlayLoader";
import Modal from "./Modal.vue";
import Loader from "vue-spinner/src/PulseLoader.vue";
import { accredite } from "@/api";

export default {
  name: "accreditation-modal",
  components: {
    Modal,
    Loader,
    OverlayLoader,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },

    formControls: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      message: "",
      cameraEnabled: false,
      isLoading: false,
      facialImage: null,
    };
  },
  beforeDestroy() {
    this.webCamOff();
  },

  methods: {
    init() {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        let constraints = {
          video: {
            width: { min: 600, max: 800 },
            height: { min: 360, max: 800 },
          },
        };
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          this.videoPlayer = document.querySelector("video");
          this.videoPlayer.srcObject = stream;
          this.webcam = stream;
          this.videoPlayer.play();
          this.cameraEnabled = true;
        });
      }
    },
    webCamOff() {
      if (this.webcam) {
        this.webcam.getTracks().forEach((track) => {
          track.stop();
          this.cameraEnabled = false;
        });
      }
    },
    takePicture() {
      var canvasPicture = document.createElement("canvas");
      canvasPicture.width = 200;
      canvasPicture.height = 200;
      const ctx = canvasPicture.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        document.querySelector("video"),
        0,
        0,
        canvasPicture.width,
        canvasPicture.height
      );
      var picture = document.createElement("div");
      picture.className = "picture m-2 w-full";

      picture.appendChild(canvasPicture);
      canvasPicture.className = "rounded-2xl shadow-xl";
      this.$refs["pictures"].replaceChildren(picture);

      this.setImages(canvasPicture.toDataURL("image/png"));
    },
    setImages(dataURL) {
      var binary = atob(dataURL.split(",")[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      var file = new Blob([new Uint8Array(array)], { type: "image/png" });
      this.facialImage = file;
    },
    handleSubmit() {
      let formData = new FormData();
      formData.append("facial_image", this.facialImage, `facial_image.png`);

      this.isLoading = true;
      accredite(this.$route.params.election, formData)
        .then(() => {
          this.$swal({
            icon: 'success',
            title: '<strong>Successfully Accredited</strong>',
            html:
              'You have been successfully accredited',
            showCloseButton: true,
            focusConfirm: false,
          })
          this.handleCloseModal();
        })
        .catch((error) => {
          // console.log(error.response.data);
          if (error.response) {
            this.message = error.response.data.message
          } else {
            this.message = "Whoops!! something went wrong";
          }
          this.$swal({
            icon: 'error',
            title: `<strong>Accreditation failed</strong>`,
            html:
              `${this.message}`,
            showCloseButton: true,
            focusConfirm: false,
          })
          
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleCloseModal() {
      this.$emit("close");
      this.webCamOff();
      this.$refs["pictures"].innerHTML = "";
    },
  },
};
</script>
<style lang="scss" >

.accreditation-modal {
  max-width: 600px;
  margin-bottom: 150px !important;
  padding-bottom: 0px;
  top: 10px !important;
}

.camera {
  box-sizing: border-box;
}
.feed {
  display: block;
  width: 100%;
  max-width: 700px;
  box-shadow: 6px 6px 12px 0px rgba(0, 0, 0, 0.35);
  margin: 0 auto;
  background-color: #171717;
  border-radius: 25px;
}
.snap {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  display: block;
  background-color: transparentize($color: #ffce00, $amount: 0.75);
  border: 1px solid #c7c6c6;
  outline: none;
  margin: 25px auto;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #dc143c;
    border: 1px solid #dc143c;
    color: #fff;
  }
  &:active {
    background-color: darken($color: #ffce00, $amount: 15);
  }
}

.picture {
  box-sizing: border-box;
  border-radius: 25px;
  box-shadow: 6px 6px 12px 0px rgba(0, 0, 0, 0.35);
  canvas {
    display: block;
    width: 100%;
    margin: 0 auto;
    box-shadow: 4px 4px 12px 0px transparentize($color: #17171717, $amount: 0.5);
    border-radius: 25px;
  }
}
.enroll-button:disabled {
  @apply opacity-70 cursor-not-allowed;
  &:hover {
    @apply bg-green-600;
  }
}
</style>
