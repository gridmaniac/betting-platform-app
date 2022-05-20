<script setup>
defineProps({
  item: null,
});

const imgPlaceholder = (e) => {
  e.target.src =
    "https://koacombat.nyc3.cdn.digitaloceanspaces.com/fighters/silhouette.png";
};
</script>

<template>
  <tr>
    <td>
      <div
        class="flex items-start content- sm:items-center flex-col sm:flex-row"
      >
        <div
          class="flex flex-1 items-center space-x-3 sm:space-x-0 flex-row sm:flex-col"
        >
          <div class="avatar w-10">
            <div class="w-12 h-12 mask mask-squircle">
              <img
                :src="`https://koacombat.nyc3.cdn.digitaloceanspaces.com/fighters/${item.fighters[0].firstName} ${item.fighters[0].lastName}.png`"
                alt="Avatar Tailwind CSS Component"
                @error="imgPlaceholder"
              />
            </div>
          </div>
          <div class="text-left sm:text-center">
            <div class="font-bold">
              {{ item.fighters[0].firstName }} {{ item.fighters[0].lastName }}
            </div>
            <div class="text-sm opacity-50">
              {{ item.weightClass }}
            </div>
          </div>
        </div>
        <!-- <div class="text-sm text-center">19:30</div> -->
        <div
          v-if="item.status == 'Canceled'"
          class="badge badge-accent hidden sm:inline-flex"
        >
          0 - 0
        </div>
        <div
          v-else-if="item.status == 'Scheduled'"
          class="badge badge-ghost hidden sm:inline-flex"
        >
          0 - 0
        </div>
        <div
          v-else-if="item.status == 'Final'"
          class="badge badge-secondary hidden hidden sm:inline-flex"
        >
          <template v-if="item.winnerId === item.fighters[0].fighterId">
            1 - 0</template
          >
          <template v-else-if="item.winnerId === item.fighters[1].fighterId">
            0 - 1</template
          >
        </div>
        <div v-else class="badge badge-secondary hidden sm:inline-flex">
          {{ item.status }}
        </div>
        <div
          class="flex flex-1 items-center space-x-3 sm:space-x-0 flex-row sm:flex-col"
        >
          <div class="avatar w-10">
            <div class="w-12 h-12 mask mask-squircle">
              <img
                :src="`https://koacombat.nyc3.cdn.digitaloceanspaces.com/fighters/${item.fighters[1].firstName} ${item.fighters[1].lastName}.png`"
                alt="Avatar Tailwind CSS Component"
                @error="imgPlaceholder"
              />
            </div>
          </div>
          <div class="text-left sm:text-center">
            <div class="font-bold">
              {{ item.fighters[1].firstName }} {{ item.fighters[1].lastName }}
            </div>
            <div class="text-sm opacity-50">
              {{ item.weightClass }}
            </div>
          </div>
        </div>
      </div>
    </td>
    <td>
      <div
        class="flex justify-center space-y-2 sm:space-y-0 space-x-0 sm:space-x-3 flex-col sm:flex-row"
      >
        <label
          v-if="item.status == 'upcoming'"
          for="my-modal"
          class="btn btn-active modal-button"
          >2.85</label
        >
        <label v-else for="my-modal" class="btn btn-active btn-disabled"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            /></svg
        ></label>
        <label
          v-if="item.status == 'upcoming'"
          for="my-modal"
          class="btn btn-active modal-button"
          >2.85</label
        >
        <label v-else for="my-modal" class="btn btn-active btn-disabled"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </label>
      </div>
    </td>
  </tr>
</template>
