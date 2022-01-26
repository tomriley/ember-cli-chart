/* global Chart */
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class EmberChart extends Component {

  constructor() {
    super(...arguments);

    this.plugins = this.plugins || [];
  }

  @action
  drawChart(element) {
    let { data, type, options, plugins } = this.args;
    let chart = new Chart(element, {
      type, data, options, plugins
    });

    this.chart = chart;
  }

  @action
  updateChart() {
    let chart = this.chart;
    let { data, options } = this.args;

    if (chart) {
      chart.data = data;
      chart.options = options;
      chart.update();

      if (this.customLegendElement) {
        this.customLegendElement.innerHTML = chart.generateLegend();
      }
    }
  }

  willDestroy() {
    this.chart.destroy();
  }

}
