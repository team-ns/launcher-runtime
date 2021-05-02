<template>
  <v-app>
    <v-dialog v-model="$store.getters.hasMessage" persistent max-width="290">
      <v-card>
        <v-card-title
          >{{ $store.state.error ? $t("dialog.error") : $t("dialog.ok") }}
        </v-card-title>
        <v-card-text>{{ $store.state.text }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="$store.getters.messageColor"
            text
            @click="$store.commit('close')"
            >{{ $t("dialog.button") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-main class="background">
      <router-view v-if="!$store.getters.loading" />
      <loading v-else />
    </v-main>
  </v-app>
</template>

<script>
import Loading from "@/views/Loading";
import { eventBus } from "@/eventBus";

export default {
  name: "App",
  components: { Loading },
  created() {
    this.$store.commit("load", this.$t("message.connect"));
    window.rpc.notify("launcher", `ready`).catch(() => {});
    this.$router.push("/").catch(() => {});
    eventBus.$on("login", () => {
      this.$router.push("/menu").catch(() => {});
    });
    eventBus.$on("download", () => {
      this.$router.push("/download").catch(() => {});
    });
  }
};
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}

body {
  user-select: none;
  -ms-overflow-style: none;
}
.background {
  background: url("./assets/background.jpg") center;
  background-size: cover;
}
</style>
