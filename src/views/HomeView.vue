<script setup lang="ts">
// Components
import OperadorasTable from '@/components/OperadorasComponents/OperadorasTable.vue';
</script>

<template>
	<main>
		<OperadorasTable />
	</main>
</template>

<style scoped>
main {
	position: relative;
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: fit-content;
	justify-self: center;
}
</style>