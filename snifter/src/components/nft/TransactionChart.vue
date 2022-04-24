<template>
    <div v-if="nftEvents.length > 0">
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>
<script>
import { Chart } from 'highcharts-vue';

export default {
    name: "TransactionChart",
    components: {
        highcharts: Chart,
    },
    computed: {
        chartOptions() {
            var events = this.nftEvents;
            var bids = [];
            var sales = [];

            // Format events for chart
            events.forEach((event) => {
                var timestamp = Date.parse(event['created_date']);
                var eventType = event['event'];
                var amount = parseFloat(event['price']);

                eventType === 'Sale' ? sales.push([timestamp, amount]) : bids.push([timestamp, amount]);
            });

            bids = bids.sort(function(a, b){return a[0] - b[0]});
            
            // Build chart options
            return {
                chart: {
                    type: 'spline',
                    zoomType: 'x'
                },
                title: {
                    text: 'NFT Transactions'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b',
                    },
                    title: {
                    text: 'Date'
                    }
                },
                yAxis: {
                    title: {
                    text: 'Amount'
                    },
                    min: 0
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%e. %b}: {point.y:.5f} eth'
                },

                plotOptions: {
                    series: {
                    marker: {
                        enabled: true
                    }
                    }
                },

                colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
                series: [{
                    name: "Bids",
                    data: bids
                },
                { 
                    name: "Sales",
                    data: sales
                }],

                responsive: {
                    rules: [{
                    condition: {
                        maxWidth: 700,
                    },
                    chartOptions: {
                        plotOptions: {
                        series: {
                            marker: {
                            radius: 2.5
                            }
                        }
                        }
                    }
                    }]
                }
            };
        }
    },
    props: {
        nftEvents: {
            type: Array,
            required: true,
        },
    },
}
</script>
<style lang="">
    
</style>