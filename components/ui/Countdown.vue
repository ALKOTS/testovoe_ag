<script setup lang="ts">
import { format } from "date-fns"
import { onUnmounted, ref } from "vue"

const timeLeft = ref(60)
const timer = ref<NodeJS.Timeout | null>()
const isRunning = ref(false)

const startTimer = () => {
	if (isRunning.value) return
	timeLeft.value = 60
	isRunning.value = true
	timer.value = setInterval(() => {
		if (timeLeft.value > 0) {
			timeLeft.value--
		} else {
			clearInterval(timer.value!)
			isRunning.value = false
		}
	}, 1000)
}

onUnmounted(() => {
	if (timer.value) clearInterval(timer.value)
})

const formattedTime = () => {
	const minutes = Math.floor(timeLeft.value / 60)
	const seconds = timeLeft.value % 60
	return format(new Date(0, 0, 0, 0, minutes, seconds), "m:ss")
}
defineExpose({
	isRunning,
	startTimer,
})
</script>

<template>
	<div class="text-gray-hint">
		{{ formattedTime() }}
		<!-- <button :disabled="isRunning" @click="startTimer">Start Timer</button> -->
	</div>
</template>
