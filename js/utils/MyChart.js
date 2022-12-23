class MyChart {

    constructor(elementId) {

        const ctx = document.getElementById(elementId);

        this.chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Rock", "Paper", "Scissor"],
                datasets: [{
                    data: [0, 0, 0],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                },
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                    }
                }
            }
        });
    }

    setScaleForYAxis(newMin, newMax) {

        if (this.chart.options.scales.y.min != newMin) {
            this.chart.options.scales.y.min = newMin;
            this.chart.update();
        }
        if (this.chart.options.scales.y.max != newMax) {
            this.chart.options.scales.y.max = newMax;
            this.chart.update();
        }
    }

    update(newData) {



        let currentData = this.chart.data.datasets[0].data;

        if (!currentData.equalsTo(newData)) {
            this.chart.data.datasets[0].data = newData.copy();
            this.chart.update();
        }
    }
}
