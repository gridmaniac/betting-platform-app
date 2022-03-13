<script setup></script>

<template>
  <slot name="activator" v-on="on"></slot>
  <label for="my-modal-2" class="btn modal-button">3.12</label>
  <input type="checkbox" id="my-modal-2" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <div class="card shadow-lg compact side bg-base-100">
        <div class="flex justify-between">
          <div class="flex-row items-center space-x-3 card-body">
            <div>
              <div class="avatar">
                <div class="rounded-full w-14 h-14 shadow">
                  <img :src="fighter" />
                </div>
              </div>
            </div>
            <div>
              <h2 class="card-title">Joe Stevenson</h2>
              <p class="text-base-content text-opacity-40">United States</p>
            </div>
          </div>
          <div class="flex-row items-center space-x-3 card-body">
            <div class="text-right">
              <h2 class="card-title">Conor McGregor</h2>
              <p class="text-base-content text-opacity-40">Ireland</p>
            </div>
            <div>
              <div class="avatar">
                <div class="rounded-full w-14 h-14 shadow">
                  <img :src="fighter2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="text-base-content text-opacity-40">Winner</p>
        <p
          class="text-base-content text-bold flex justify-between items-center"
        >
          Joe Stevenson <span class="text-sm">02/15 19:30 PST</span>
          <span class="text-white font-bold">3.12</span>
        </p>
        <div class="divider"></div>
        <div class="form-control">
          <label class="input-group input-group-md justify-end">
            <input
              type="text"
              value="150 000.00"
              class="input input-bordered input-md"
            />
            <span><img class="flex-0 mr-1 h-6" :src="token" /></span>
          </label>
        </div>
        <div class="text-base-content text-right pr-1 mt-1 text-sm">
          Potential win: <span class="font-bold">468 000 KOA</span>
        </div>
      </div>
      <div class="modal-action">
        <label for="my-modal-2" class="btn btn-primary">Place a bet</label>
        <label for="my-modal-2" class="btn">Close</label>
      </div>
    </div>
  </div>
</template>
