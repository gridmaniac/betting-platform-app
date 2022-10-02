<template>
  <div class="flex flex-col gap-6">
    <article class="prose p-3">
      <h1>How To Withdraw Tokens</h1>
      <p>
        Make sure you have the <strong>MetaMask</strong> app installed on your
        device and connected to your account.
      </p>
      <h2>Gas Fees</h2>
      <p>
        To request withdrawal you will need some amount of
        <strong>Ethereum</strong> on your balance to pay transaction fees (gas).
      </p>
      <p>
        The deposit process for
        <strong>Ethereum</strong>
        is the same as for tokens.
      </p>
      <p>
        If you want to know the exact amount of
        <strong>ETH</strong>
        required for a withdrawal transaction, you can skip this step and try to
        withdraw without gas. The system will display the minimum amount of
        <strong>ETH</strong>
        that you need to deposit on your balance for that specific transaction.
      </p>
      <h2>Withdraw</h2>
      <p>
        Type desired amount of tokens to withdraw and click Withdraw button.
      </p>
      <p>
        It takes around a minute for the payment to reach your
        <strong>MetaMask</strong> wallet.
      </p>
    </article>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(async () => {
  document.querySelector("main")?.scrollTo(0, 0);
})
</script>