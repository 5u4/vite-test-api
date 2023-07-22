<script setup>
import { ref } from "vue";
const x = ref("no response yet");

const handleClick = async () => {
  console.log(`${import.meta.env.VITE_BACKEND_URL}/api/test`);
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/test`);
  const data = await res.json();
  x.value = JSON.stringify(data);
};
</script>

<template>
  this is development
  <code>
    <pre>{{ x }}</pre>
  </code>
  <button v-on:click="handleClick">click</button>
</template>
