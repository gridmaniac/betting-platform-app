<script setup lang="ts">
export interface ITitle {
  icon: any;
  name: string;
}

interface IProps {
  title: ITitle;
}

defineProps<IProps>();
</script>

<template>
  <div class="card shadow-lg compact side bg-base-100 p-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center col-span-2 sm:col-span-1">
        <component
          :is="title.icon"
          class="inline-block w-6 h-6 mr-2 stroke-current"
        />
        <h1 class="font-bold text-2xl text-primary">{{ title.name }}</h1>
      </div>
      <div class="flex justify-start sm:justify-center">
        <slot name="control-center"></slot>
      </div>
      <div class="flex justify-end">
        <slot name="control-right"></slot>
      </div>
    </div>
  </div>
</template>
