<script setup lang="ts">
const timeLeft = ref(60)
const timer = ref<NodeJS.Timeout>()
const isRunning = ref(false)

const startTimer = () => {
	if (isRunning.value) return
	timeLeft.value = 60
	isRunning.value = true
	timer.value = setInterval(() => {
		if (timeLeft.value > 0) {
			timeLeft.value--
		} else {
			clearInterval(timer.value)
			isRunning.value = false
		}
	}, 1000)
}

onUnmounted(() => {
	clearInterval(timer.value)
})

defineExpose({
	isRunning,
	startTimer,
})
</script>

<template>
	<div class="text-gray-hint">
		0:{{ timeLeft }}
		<!-- <button :disabled="isRunning" @click="startTimer">Start Timer</button> -->
	</div>
</template>

<style scoped>
button {
	margin-top: 10px;
	padding: 10px;
	background-color: #007bff;
	color: white;
	border: none;
	cursor: pointer;
}
button:disabled {
	background-color: #aaa;
	cursor: not-allowed;
}
</style>
