import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#8bc34a",
        secondary: "#cddc39",
        accent: "#ffc107",
        error: "#f44336",
        warning: "#ff9800",
        info: "#4caf50",
        success: "#009688",
      },
    },
  },
});
