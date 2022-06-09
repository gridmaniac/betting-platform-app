<script setup>
import { ref, computed, onMounted, inject } from "vue";
import moment from "moment";
//assets
import token from "../assets/koa-token.png";
//icon
import { LightningBoltIcon } from "@heroicons/vue/outline";
import { ArrowCircleRightIcon } from "@heroicons/vue/outline";
import { CheckCircleIcon } from "@heroicons/vue/outline";
import { CashIcon } from "@heroicons/vue/outline";
//components
import Accordion from "../components/Accordion.vue";
import Table from "../components/Table.vue";
import Modal from "../components/Modal.vue";
//composables
import { fetchMMA } from "../http/events";
import Loader from "../components/Loader.vue";
import { imgPlaceholder } from "../composables/img";

const { currentBet, userBets, isModalBetVisible } = inject("bets");

const betValue = ref("150 000.00");
const isUpcoming = ref(true);
const events = ref([]);
const upcomingEvents = ref([]);
const completedEvents = ref([]);

onMounted(async () => {
  events.value = await fetchMMA();

  const newEvents = [];
  const map = {};
  events.value.forEach((event) => {
    if (map[event.name]) {
      map[event.name].push(event);
      newEvents[newEvents.length - 1].fights.push(event);
    } else {
      map[event.name] = [event];
      newEvents.push({
        name: event.name,
        id: event._id,
        dataTime: event.startTime,
        fights: [event],
      });
    }
  });

  completedEvents.value = await newEvents
    .filter((x) => {
      const a = moment().format();
      const b = moment(x.dataTime).format();
      const result = moment(b).isBefore(moment(a));
      if (result) return x;
    })
    .reverse();

  upcomingEvents.value = await newEvents.filter((x) => {
    const a = moment().format();
    const b = moment(x.dataTime).format();
    const result = moment(b).isAfter(moment(a));
    if (result) return x;
  });
});

onMounted(() => {
  document.querySelector("main").scrollTo(0, 0);
});

const sortedEvents = computed(() => {
  if (isUpcoming.value) {
    return upcomingEvents.value;
  }
  return completedEvents.value;
});

const changeEventsStatus = () => {
  isUpcoming.value = !isUpcoming.value;
};

const getFights = async (event) => {
  event.isChecked = !event.isChecked;
  if (event.fights === undefined) {
    event.fights = [];
  }
  if (!event.fights.length) {
    const response = await fetchFights(event.eventId);
    const sortedFilghts = response.filter((x) => {
      if (x.status === null || x.status == "Canceled") {
        return;
      }
      return x;
    });
    event.fights = sortedFilghts;
  }
};

const placeBet = (event) => {
  // const event = sortedEvents.value.find((x) => {
  //   console.log(x);
  //   if (x.eventId === currentBet.value.eventId) return x;
  //   return;
  // });
  console.log(event);
  let newBet = {
    name: event.eventName,
    dateTime: event.dataTime,
    status: event.status,
    winner: currentBet.value.winner,
    cash: betValue.value,
  };
  console.log(newBet);
  userBets.value.push(newBet);
  localStorage.setItem("userBets", JSON.stringify(userBets.value));
  betValue.value = "150 000.00";
  newBet = {};
  isModalBetVisible.value = false;
};

const getNormalName = (name) => {
  return `${name.split(", ")[1]} ${name.split(", ")[0]}`;
};
</script>

<template>
  <Modal v-model="isModalBetVisible">
    <template v-if="currentBet.fighters">
      <div class="flex items-center flex-col mb-6">
        <h2
          class="font-bold text-2xl text-primary justify-start sm:justify-center"
        >
          {{ currentBet.eventName }}
        </h2>
        <p class="text-primary">
          {{ moment(currentBet.dateTime).format("MMMM DD, YYYY hh:mm a") }}
        </p>
      </div>
      <div class="divider"></div>
      <div class="justify-between hidden sm:flex mb-6">
        <div class="flex items-center space-x-3">
          <div>
            <div class="avatar">
              <div class="rounded-full w-14 h-14 shadow">
                <img
                  :src="`https://koacombat.nyc3.cdn.digitaloceanspaces.com/fighters/${getNormalName(currentBet.fighters[0].name)}.png`"
                  alt="Avatar Tailwind CSS Component"
                  @error="imgPlaceholder"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 class="card-title">
              {{ getNormalName(currentBet.fighters[0].name) }}
            </h2>
            <p class="text-base-content text-opacity-40">
              {{ currentBet.weightClass }}
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <div class="text-right">
            <h2 class="card-title">
              {{ getNormalName(currentBet.fighters[1].name) }}
            </h2>
            <p class="text-base-content text-opacity-40">
              {{ currentBet.weightClass }}
            </p>
          </div>
          <div>
            <div class="avatar">
              <div class="rounded-full w-14 h-14 shadow">
                <img
                  :src="`https://koacombat.nyc3.cdn.digitaloceanspaces.com/fighters/${getNormalName(currentBet.fighters[1].name)}.png`"
                  alt="Avatar Tailwind CSS Component"
                  @error="imgPlaceholder"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex mb-6">
        <p class="text-base-content text-opacity-40">Winner:</p>
        <p
          class="text-base-content text-bold flex justify-between items-center ml-2"
        >
          {{ getNormalName(currentBet.winner.name) }}
          <!-- <span class="text-sm">9:30 PM</span
        ><span class="text-white font-bold">3.12</span> -->
        </p>
      </div>
      <div class="form-control">
        <label class="input-group input-group-md justify-end"
          ><input
            type="text"
            class="input input-bordered input-lg"
            v-model="betValue" />
          <span> <img class="flex-0 mr-1 h-5" :src="token" /> </span
        ></label>
      </div>
      <div class="divider"></div>
      <div class="modal-action">
        <button class="btn btn-primary" @click="placeBet(currentBet)">Place a bet</button>
        <button class="btn" @click="isModalBetVisible = false">Close</button>
      </div>
    </template>
  </Modal>
  <div
    class="card shadow-lg compact side bg-base-100 p-3 mx-2 sm:mx-6 max-w-6xl"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center col-span-2 sm:col-span-1">
        <component
          :is="LightningBoltIcon"
          class="inline-block w-6 h-6 mr-2 stroke-current"
        />
        <h1 class="font-bold text-2xl text-primary">MMA</h1>
      </div>
      <div class="flex justify-start sm:justify-center">
        <div class="tabs tabs-boxed">
          <a
            class="tab tab-sm"
            :class="{ 'tab-active': isUpcoming }"
            @click="changeEventsStatus(true)"
          >
            <span class="hidden md:block">Upcoming</span>
            <component
              :is="ArrowCircleRightIcon"
              class="block md:hidden w-6 h-6 stroke-current"
            />
          </a>
          <a
            class="tab tab-sm"
            :class="{ 'tab-active': !isUpcoming }"
            @click="changeEventsStatus(false)"
          >
            <span class="hidden md:block">Completed</span>
            <component
              :is="CheckCircleIcon"
              class="block md:hidden w-6 h-6 stroke-current"
            />
          </a>
        </div>
      </div>
      <div class="flex justify-end">
        <select
          class="select select-bordered select-sm max-w-xs ml-6"
          value="UFC"
        >
          <option selected="selected">UFC</option>
        </select>
      </div>
    </div>
  </div>
  <div class="relative max-w-6xl mx-2 sm:m-6">
    <Loader v-if="events === []" />
    <Accordion
      v-for="event in sortedEvents"
      :key="event.id"
      :event="event"
      @click="getFights(event)"
    >
      <template #title>{{ event.name }}</template>
      <template #description>{{
        moment(event.dateTime).format("MMMM DD, YYYY")
      }}</template>
      <template #body>
        <Table :rows="event.fights" :eventItem="event"></Table>
      </template>
    </Accordion>
  </div>
</template>

<style scoped></style>
