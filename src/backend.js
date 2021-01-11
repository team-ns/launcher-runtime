import { eventBus } from "./eventBus";
import store from "@/store";
import i18n from "@/i18n";

function logined(profiles) {
  store.commit("profiles", JSON.parse(profiles));
  store.commit("close");
  eventBus.$emit("login");
}

function ready(ram) {
  store.state.maxRam = ram;
  store.commit("loaded");
}

function error(errorMessage) {
  store.commit("error", errorMessage);
}

function settings(s) {
  store.commit("settings", JSON.parse(s));
}

const download = {
  wait: function() {
    store.commit("load", i18n.t("message.hash"));
  },
  updateSize: function(size) {
    store.state.download.currentSize = size;
  },
  setTotalSize: function(totalSize) {
    store.state.download.totalSize = totalSize;
    store.commit("close");
    eventBus.$emit("download");
  }
};

export { logined, error, settings, ready, download };
