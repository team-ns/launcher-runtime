<template>
  <v-layout>
    <v-container>
      <v-row>
        <v-col>
          <v-carousel height="450" v-model="selectedProfile">
            <v-carousel-item
              v-for="profile in $store.state.profiles"
              :key="profile.name"
            >
              <v-sheet color="primary" height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                  <div class="display-3">{{ profile.name }}</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row class="text-center mt-5">
        <v-col>
          <v-btn color="error" @click="logout">
            {{ $t("menu.leave") }}
          </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="play" large color="success">
            {{ $t("menu.enter") }}
          </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="settingsSelected = !settingsSelected">
            {{ $t("menu.settings") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-overlay :value="settingsSelected">
      <v-layout fluid fill-height align-center justify-center>
        <v-flex>
          <v-card width="500px" light>
            <v-card-title>
              {{ $t("settings.title") }}
            </v-card-title>
            <v-card-text>
              <v-form v-model="validSettings">
                <v-slider
                  v-model="$store.state.settings.ram"
                  :max="$store.state.maxRam"
                  min="0"
                  step="1024"
                  :label="$t('settings.ram')"
                  :tick-labels="ramLabels"
                  thumb-label
                ></v-slider>
                <v-text-field
                  @click="selectDir"
                  readonly
                  v-model="$store.state.settings.gameDir"
                  :label="$t('settings.dir')"
                  prepend-icon="mdi-folder"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-card-actions>
                <v-btn
                  @click="saveSettings"
                  :disabled="!validSettings"
                  type="submit"
                  color="success"
                  >{{ $t("settings.apply") }}</v-btn
                >
              </v-card-actions>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-overlay>
  </v-layout>
</template>

<script>
export default {
  name: "Menu",
  data: () => ({
    selectedProfile: 0,
    settingsSelected: false,
    minRam: 0,
    maxRam: 2048,
    ramLabels: [],
    validSettings: true
  }),
  methods: {
    logout: async function() {
      await window.rpc.notify("launcher", `logout`);
      await this.$router.push("/");
    },
    play: async function() {
      let json = {
        play: {
          profile: this.$store.state.profiles[this.selectedProfile].name
        }
      };
      await window.rpc.notify("launcher", json);
      this.$store.commit("load", this.$t("message.hash"));
    },
    selectDir: async function() {
      await window.rpc.notify("launcher", `selectGameDir`);
    },
    saveSettings: async function() {
      let json = {
        saveSettings: this.$store.state.settings
      };
      await window.rpc.notify("launcher", json);
      this.settingsSelected = false;
    }
  },
  created() {}
};
</script>
