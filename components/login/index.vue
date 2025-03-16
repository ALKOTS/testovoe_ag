<template>
	<div
		class="w-[500px] h-[600px] outline outline-1 outline-input rounded-md p-[30px] *:w-full bg-white flex flex-col items-center justify-between"
	>
		<div
			class="bg-inherit flex items-center flex-col w-full *:w-full gap-7 py-10"
		>
			<div class="h-10 max-w-[300px] w-[300px] bg-placeholder">logo</div>
			<NuxtPage />
		</div>
		<LoginFooter />
	</div>
</template>
