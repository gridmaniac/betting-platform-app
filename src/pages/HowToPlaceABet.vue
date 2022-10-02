<template>
  <div class="flex flex-col gap-6">
    <article class="prose p-3">
      <h1>How to Place a Bet</h1>
      <p>After a successful deposit, you can start placing bets.</p>
      <h2>Placing a Bet</h2>
      <p>
        Once you have decided which target sport event you want to bet on, you
        need to pick the winner by clicking on the button in the winner column.
      </p>
      <p>
        This will open a betting window where you can type the desired amount of
        tokens to stake and check bet details before placing.
      </p>
      <p>
        If the button is locked, it means the betting period has already passed.
      </p>
      <h2>Results</h2>
      <p>
        You can always check your open bet status as well as your bet history
        from the <strong>My Bets</strong> page.
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