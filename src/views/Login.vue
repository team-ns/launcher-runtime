<template>
  <v-layout fluid fill-height align-center justify-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-form ref="form" v-model="valid" @submit.prevent="submit()">
          <v-toolbar dark class="elevation-2" color="primary" flat>
            <v-toolbar-title>{{ $t("login.title") }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model="name"
              required
              maxlength="16"
              counter
              :rules="rules.name"
              :label="$t('login.login')"
              name="login"
              type="text"
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              :rules="rules.password"
              maxlenght="32"
              required
              :label="$t('login.password')"
              type="password"
            >
            </v-text-field>
            <v-checkbox v-model="rememberMe" :label="$t('login.rememberMe')">
            </v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!valid" type="submit" color="success"
              >{{ $t("login.button") }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "../store";
import { launcher } from "nslauncher-runtime-api";

export default {
  name: "Login",
  data: () => ({
    name: "",
    password: "",
    rememberMe: false,
    valid: true,
    rules: {
      name: [],
      password: [],
    },
  }),
  methods: {
    submit: async function () {
      try {
        let result = await launcher.login(
          this.name,
          this.password,
          this.rememberMe
        );
        store.state.login = this.name;
        store.commit("profiles", result.profiles);
        store.commit("close");
        this.$router.push("/menu").catch(() => {});
      } catch (e) {
        store.commit("error", e);
      }
    },
  },
};
</script>

<style scoped></style>
