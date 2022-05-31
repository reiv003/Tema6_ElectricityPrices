<template>
	<!-- The graph points are off by 1, ie. the price for 00 is instead showing at 01. The label for this data is also showing as undefined. Not sure how to fix either of these yet.  -->
	<div class="pricesGraph">
		<Line v-if="loaded"
			:chart-data="chartData"
		/>
	</div>

	<div class="pricesList">
		<div> {{ displayPrices }} </div>
	</div>
	
</template>

<script>
	/* Uses https://vue-chartjs.org/guide/ to render a line chart.*/ 

	import { Line } from 'vue-chartjs'
	// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, lineController, lineElement } from 'chart.js'

	// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, lineController, lineElement)
	// import Chart from 'chart.js/auto'

	/*
	Got errors when trying to import the necessary components individually (it started by saying PointElement was not registered, but then threw an error for another element after). 
	I've just imported everything for the time being.

	sources:
	https://stackoverflow.com/questions/71429342/react-chart-js-2-in-combination-with-typescript-for-linecharts-uncaught-error
	
	and

	https://stackoverflow.com/questions/65002923/chart-js-where-do-i-find-which-components-should-be-registered
	 */

	import { Chart, registerables } from 'chart.js'

	Chart.register(...registerables)

	export default {
		name: 'LineChart',
		components: { Line },

		data() {
			return {
				loaded: false,
				price: '',
				data: '',
				prices: [],
				displayPrices: '',
				chartData: {
					labels: [ '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '23' ],
					datasets: [ { data: [null] } ]
				},
		

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
				console.log(data);
				this.data = data;

				const kwhPrices = Object.values(data);
				
				/* This loop pulls only the field "kwhPrices" from the objects in the API. Originally made to only output the prices as one text block, which is why it first pushes the values to the prices array, which later gets joined into one text block. However for the graph, this data has to be pushed into the "chartData" property (and further into datasets -> data). I tried writing just datasets: null, or datasets: [null], as the vue-chart guide does in the API section, but this did not work when I tried it. It's possible the guide assumes that the data coming from the API is already structured/formatted to fit. */
				for (let i = 0; i < kwhPrices.length; i++) {
					this.prices.push(kwhPrices[i].NOK_per_kWh);
					this.chartData.datasets[0].data.push(kwhPrices[i].NOK_per_kWh);
				}
				this.displayPrices = this.prices.join(' ');
				this.loaded = true;

			}
		}
	}
</script>

<style>

</style>	