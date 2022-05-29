<script setup>
import { inject } from "vue";
//src
import token from "../../../src/assets/koa-token.png";

const { isModalRegSuccessVisible } = inject("auth");
console.log(isModalRegSuccessVisible);

const closeModal = () => {
  isModalRegSuccessVisible.value = false;
};

</script>

<template>

  <div>
    <img class="d-block m-auto w-40" :src="token" alt="koa-token" />
    <h2 class="font-bold text-2xl text-primary">
      <span>Verify your Email</span>
    </h2>
    <p class="mb-5">
      We have sent an email to <span class="text-primary">{{ email }}</span>
    </p>
    <p>
      You need to verify your email to continue. If you have not recevied the
      varification email, please check your "spam" folder.
    </p>
  </div>
  <button class="btn btn-outline" @click="closeModal">Close</button>
</template>
