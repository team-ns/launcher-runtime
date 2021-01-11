<template>
  <v-layout fluid fill-height align-center justify-center>
    <v-flex xs12 sm8 md6>
      <v-container class="justify-center">
        <v-card>
          <v-card-subtitle>
            <v-layout row justify-center align-center>
              <v-progress-circular
                size="70"
                width="8"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-layout>
          </v-card-subtitle>
          <v-card-title class="justify-center">
            <h3>{{ $store.state.text }}</h3>
          </v-card-title>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style scoped></style>
