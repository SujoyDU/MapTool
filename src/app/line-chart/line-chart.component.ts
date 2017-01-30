import {Component, OnInit} from '@angular/core';

declare let d3: any;
declare let dc: any;
declare let ndx: any;
declare let crossfilter: any;


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  bar_chart_id: any;

  ngOnInit() {
    this.bar_chart_id = "chart-id";
    var experiments = [
      {Run: 1, Age_19_Under: 26.9, Age_19_64: 62.3, Age_65_84: 9.8, Age_85_and_Over: 0.9},
      {Run: 2, Age_19_Under: 23.5, Age_19_64: 60.3, Age_65_84: 14.5, Age_85_and_Over: 1.8},
      {Run: 3, Age_19_Under: 24.3, Age_19_64: 62.5, Age_65_84: 11.6, Age_85_and_Over: 1.6},
      {Run: 4, Age_19_Under: 24.6, Age_19_64: 63.3, Age_65_84: 10.9, Age_85_and_Over: 1.2},
      {Run: 5, Age_19_Under: 24.5, Age_19_64: 62.1, Age_65_84: 12.1, Age_85_and_Over: 1.3},
      {Run: 6, Age_19_Under: 24.7, Age_19_64: 63.2, Age_65_84: 10, Age_85_and_Over: 2.2},
      {Run: 7, Age_19_Under: 25.6, Age_19_64: 58.5, Age_65_84: 13.6, Age_85_and_Over: 2.4},
      {Run: 8, Age_19_Under: 24.1, Age_19_64: 61.6, Age_65_84: 12.7, Age_85_and_Over: 1.5},
      {Run: 9, Age_19_Under: 24.8, Age_19_64: 59.5, Age_65_84: 13.5, Age_85_and_Over: 2.2},
    ];

    var ndx = crossfilter(experiments);
    var all = ndx.groupAll();

    var runDimension = ndx.dimension(function (d) {
      return d.Run;
    });

    var age19UnderGroup = runDimension.group().reduceSum(function (d) {
      return d.Age_19_Under;
    });
    var age19To64Group = runDimension.group().reduceSum(function (d) {
      return d.Age_19_64;
    });
    var age65To84Group = runDimension.group().reduceSum(function (d) {
      return d.Age_65_84;
    });
    var age85AndOverGroup = runDimension.group().reduceSum(function (d) {
      return d.Age_85_and_Over;
    });

    dc.compositeChart("#" + this.bar_chart_id)
      .width(1160)
      .height(250)
      .margins({top: 10, right: 10, bottom: 20, left: 40})
      .dimension(runDimension)
      .transitionDuration(500)
      .elasticY(true)
      .brushOn(false)
      .valueAccessor(function (d) {
        return d.value;
      })
      .title(function (d) {
        return "\nNumber of Povetry: " + d.key;

      })
      .x(d3.scale.linear().domain([4, 27]))
      .compose([
        dc.lineChart(this.bar_chart_id).group(age19UnderGroup),
        dc.lineChart(this.bar_chart_id).group(age19To64Group),
        dc.lineChart(this.bar_chart_id).group(age65To84Group),
        dc.lineChart(this.bar_chart_id).group(age85AndOverGroup)
      ])
    ;

    dc.renderAll();
  }

}




