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
import { event, launcher, system } from "nslauncher-runtime-api";
import store from "./store";
import i18n from "./i18n";

export default {
  name: "App",
  components: { Loading },
  created() {
    this.$store.commit("load", this.$t("message.connect"));
    system.getTotalRam().then((ram) => {
      store.state.maxRam = ram;
    });
    event.listen("startDownload", (size) => {
      store.commit("close");
      store.state.download.totalSize = size;
      this.$router.push("/download").catch(() => {});
    });
    event.listen("hashing", () => {
      store.commit("load", i18n.t("message.hash"));
    });
    launcher
      .ready()
      .then((result) => {
        console.log(result);
        store.commit("settings", result.settings);
        if (result.profiles) {
          store.commit("profiles", result.profiles);
          store.commit("close");
          this.$router.push("/menu").catch(() => {});
        } else {
          store.commit("close");
          this.$router.push("/").catch(() => {});
        }
      })
      .catch((error) => {
        this.$router
          .push("/")
          .then(() => store.commit("error", error))
          .catch(() => {});
      });
  },
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
