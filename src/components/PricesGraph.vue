<template>
<div class="content">
	<h2> {{ new Date().toLocaleString() }} </h2>
	<!-- The graph points were off by 1, ie. the price for 00 was instead showing at 01. Did not figure out how to actually fix this, so I cheesed it by adding an empty label first so that the numbers would at least line up. The graph on https://www.chartjs.org/docs/latest/charts/line.html does touch the edge/match up to the first label properly, so I'm not sure what the issue is. It's not that the label is 00, the behavior is the same with a string or other number.   -->
		<div class="pricesGraph">
			<Line v-if="loaded"
				:chart-data="chartData"
				:plugins="plugins"
				:height="height"
				
			/>
		</div>
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
	I've just imported everything (registerables) for the time being.

	sources:
	https://stackoverflow.com/questions/71429342/react-chart-js-2-in-combination-with-typescript-for-linecharts-uncaught-error
	
	and

	https://stackoverflow.com/questions/65002923/chart-js-where-do-i-find-which-components-should-be-registered
	 */

	import { Chart, registerables } from 'chart.js'

	Chart.register(...registerables)

	/* Had some issues trying to define these values using the vue-chart wrapper structure, so they are defined outside using chart js globally defined values. */
	Chart.defaults.font.size = 22;
	Chart.defaults.font.family = "Quicksand";
	Chart.defaults.plugins.tooltip.backgroundColor = "#90DAE4";
	Chart.defaults.plugins.tooltip.titleColor = "#344D69";
	Chart.defaults.plugins.tooltip.bodyColor = "#002653";
	

	export default {
		name: 'LineChart',
		components: { Line },
		props: {
			plugins: {
				type: Object,
				default: () => {}
			},
			height: {
				type: Number,
				default: 180
			}
		},

		data() {
			return {
				loaded: false,
				price: '',
				data: '',
				prices: [],
				displayPrices: '',
				chartData: {
					labels: [ '', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23' ],
					
					datasets: [ { 
						label: "Strømpriser",
						/* Using css variables did not seem work here, so the colors are added manually. */
						pointBackgroundColor: "#90DAE4",
						pointBorderColor: "#90DAE4",
						pointRadius: 5,
						pointHoverRadius: 7,
					
						backgroundColor: "#90DAE4",
						borderColor: "#344D69",
						borderCapStyle: "round",
						data: [null] 
						}, ],
					
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