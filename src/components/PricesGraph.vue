<template>
	<h1>Strømpriser</h1>
	<div class="pricesList">
		<div> {{ displayPrices }} </div>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				price: '',
				data: '',
				prices: [],
				displayPrices: ''

			}
		},

		created() {
			this.getPrices();
		},

		methods: {
			async getPrices() {
				const url = 'https://playground-norway-power.ffail.win/?zone=NO2&date=2022-01-31&key=2yywtyet';
				const res = await fetch(url);
				const data = await res.json();
				// console.log(data);
				this.data = data;
				// console.log(Object.values(data));
				const kwhPrices = Object.values(data);
				// console.log(kwhPrices[0].NOK_per_kWh);
				for (let i = 0; i < kwhPrices.length; i++) {
					console.log(kwhPrices[i].NOK_per_kWh);
					this.prices.push(kwhPrices[i].NOK_per_kWh);
				}
				console.log(this.prices.join(' '));
				this.displayPrices = this.prices.join(' ');
				// this.price = eur[0].NOK_per_kWh;
			}
		}
	}
</script>

<style>
	.pricesList {
		background-color: teal;
		width: 60px;
		padding: 5px;
		margin: 5px;
		margin: auto;
	}
</style>	