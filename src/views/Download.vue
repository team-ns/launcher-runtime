<template>
  <v-layout fluid fill-height align-center justify-center>
    <v-flex xs12 sm8 md6>
      <v-container class="justify-center">
        <v-card>
          <v-card-title class="justify-center">
            <h3>{{ $t("message.download") }}</h3>
          </v-card-title>
          <v-card-subtitle>
            <v-layout row justify-center align-center>
              <v-progress-linear
                color="primary"
                height="20"
                :value="$store.getters.downloadStatus"
                striped
              ></v-progress-linear>
            </v-layout>
          </v-card-subtitle>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Download"
};
</script>

<style scoped></style>
