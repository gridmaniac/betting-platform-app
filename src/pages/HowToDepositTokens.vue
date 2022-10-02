<template>
  <div class="flex flex-col gap-6">
    <article class="prose p-3">
      <h1>How to Deposit Tokens</h1>
      <p>
        Please follow
        <a target="_blank" href="https://koatoken.koacombat.com"
          >official instructions</a
        >
        on how to purchase KOA COMBAT tokens using
        <strong>MetaMask</strong> app.
      </p>
      <p>
        After you have the <strong>MetaMask</strong> wallet installed on your
        device, you can proceed to the next step.
      </p>
      <h2>Connect Wallet</h2>
      <p>
        Navigate to the <strong>Wallet</strong> page and click on
        <strong>Connect Wallet</strong>
        button.
      </p>
      <p>
        During the connection process, you will need to grant access to your
        <strong>MetaMask</strong> account.
      </p>
      <h2>Deposit</h2>
      <p>
        Type desired amount of tokens to deposit and click the
        <strong>Deposit button</strong>.
      </p>
      <p>
        You will see the <strong>MetaMask</strong> window where you can check
        and confirm transaction details before the actual payment.
      </p>
      <p>
        It usually takes around 2 minutes for a transaction to be reflected on
        your balance.
      </p>
      <p>
        During that time please refrain from disconnecting your wallet before
        all awaiting transactions are settled.
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