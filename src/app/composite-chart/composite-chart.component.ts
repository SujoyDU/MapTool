import {Component, OnInit} from '@angular/core';
import {Line} from "tslint/lib/test/lines";
import {forEach} from "@angular/router/src/utils/collection";

declare let dc:any;
declare let crossfilter:any;
declare let d3:any;

@Component({
  selector: 'app-composite-chart',
  templateUrl: './composite-chart.component.html',
  styleUrls: ['./composite-chart.component.css']
})
export class CompositeChartComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    var yearRingChart = dc.pieChart("#chart-ring-year"),
        spendHistChart = dc.barChart("#chart-hist-spend"),
        spenderRowChart = dc.rowChart("#chart-row-spenders");
    var composite = dc.compositeChart("#test_composed");
    //var series = dc.seriesChart("#chart-series");
    // use static or load via d3.csv("spendData.csv", function(error, spendData) {/* do stuff */});
    var spendData = [
      {Name: 'Mr A', Spent: '40', Year: 2011, Income:'20'},
      {Name: 'Mr B', Spent: '10', Year: 2011 , Income:'10'},
      {Name: 'Mr C', Spent: '40', Year: 2011, Income:'20'},
      {Name: 'Mr A', Spent: '70', Year: 2012, Income:'40'},
      {Name: 'Mr B', Spent: '20', Year: 2012, Income:'30'},
      {Name: 'Mr B', Spent: '50', Year: 2013, Income:'10'},
      {Name: 'Mr C', Spent: '30', Year: 2013, Income:'20'}
    ];
  // // normalize/parse data
  //     spendData.forEach(function (d) {
  //       d.Spent = d.Spent.match(/\d+/);
  //     });
// set crossfilter
    var ndx = crossfilter(spendData),

      yearDim = ndx.dimension(function (d) {
        return +d.Year;
      }),
      spendDim = ndx.dimension(function (d) {
        return Math.floor(d.Spent / 10);
      }),
      nameDim = ndx.dimension(function (d) {
        return d.Name;
      }),

      // spendPerYearByName = yearDim.group().reduceSum(function (d) {
      //   return +d.name;
      // }),

      spendPerYear = yearDim.group().reduceSum(function (d) {
        return +d.Spent;
      }),
      incomePerYear = yearDim.group().reduceSum(function (d) {
        return +d.Income;
      }),
      spendPerName = nameDim.group().reduceSum(function (d) {
        return +d.Spent;
      }),
      spendHist = spendDim.group().reduceCount();

    yearRingChart
      .dimension(yearDim)
      .group(spendPerYear)
      .innerRadius(50)
      .controlsUseVisibility(true);

    spendHistChart
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .controlsUseVisibility(true);

    spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
    spendHistChart.yAxis().ticks(2);

    spenderRowChart
    .dimension(nameDim)
    .group(spendPerName)
    .elasticX(true)
    .controlsUseVisibility(true);

    var LineChart1 =  dc.lineChart(composite)
                .dimension(yearDim)
                .colors('yellow')
                .group(spendPerYear, "Top Line")
                .dashStyle([2,2])

    var LineChart2 = dc.lineChart(composite)
                .dimension(yearDim)
                .colors('blue')
                .group(incomePerYear, "Bottom Line")
                .dashStyle([5,5])
    var a = dc.lineChart;
    var abc = [LineChart1, LineChart2];

    composite
        .x(d3.scale.linear().domain([2011,2013]))
        .yAxisLabel("The Y Axis")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .elasticY(true)
        .compose([
          //abc
         //a = abc.map(function (n) { return n }),
            LineChart1, LineChart2
            // dc.lineChart(composite)
            //     .dimension(yearDim)
            //     .colors('yellow')
            //     .group(spendPerYear, "Top Line")
            //     .dashStyle([2,2]),

            // dc.lineChart(composite)
            //     .dimension(yearDim)
            //     .colors('blue')
            //     .group(incomePerYear, "Bottom Line")
            //     .dashStyle([5,5])
            ])






    dc.renderAll();
  }


}
