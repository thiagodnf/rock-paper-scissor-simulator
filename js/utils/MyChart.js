class MyChart {

    static DARK_COLOR = "rgba(255, 255, 255, 0.15)";
    static LIGHT_COLOR = "#dee2e6";

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
                    title: {
                        display: true,
                        text: "Stats"
                    },
                    legend: {
                        display: false
                    },
                },
                scales: {
                    x: {
                        grid: {
                            color: MyChart.LIGHT_COLOR
                        }
                    },
                    y: {
                        min: 0,
                        max: 100,
                        grid: {
                            color: MyChart.LIGHT_COLOR
                        }
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

    setColorTheme(colorTheme) {

        if (colorTheme === "dark") {
            this.chart.options.scales.x.grid.color = MyChart.DARK_COLOR;
            this.chart.options.scales.y.grid.color = MyChart.DARK_COLOR;
        } else {
            this.chart.options.scales.x.grid.color = MyChart.LIGHT_COLOR;
            this.chart.options.scales.y.grid.color = MyChart.LIGHT_COLOR;
        }

        this.chart.update();
    }
}
