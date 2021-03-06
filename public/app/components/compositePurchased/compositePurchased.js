angular.module('App')
.component('compositePurchasedComp', {
    templateUrl: 'app/components/compositePurchased/compositePurchased.html',
    controller: CompositePurchasedCompCtrl,
    controllerAs: 'compositePurchasedComp'
});

function CompositePurchasedCompCtrl(DataServices) {
  compositePurchasedComp = this;

  DataServices.getPurchased().then(function(data){
    if(data.length>0){

      data = data.map(function(stock){
        return {
          Symbol: stock.stock.Symbol,
          Type: "price",
          Params: ["c"]
        }
      })


      DataServices.getChartData(data).then(function(data) {
        $(function() {
          var seriesOptions = [];

          var names = data.map(function(item){
            return item.symbol;
          });

          function createChart() {
            Highcharts.stockChart('composite-purchased', {
              rangeSelector: {
                selected: 4
              },
              yAxis: {
                labels: {
                  formatter: function() {
                    return (this.value > 0
                        ? ' + '
                        : '') + this.value + '%';
                  }
                },
                plotLines: [
                  {
                    value: 0,
                    width: 2,
                    color: 'silver'
                  }
                ]
              },
              plotOptions: {
                series: {
                  compare: 'percent',
                  showInNavigator: true
                }
              },
              tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2,
                split: true
              },
              series: seriesOptions
            });
          } // end createChart

          data.forEach(function(entry, index){
            seriesOptions[index] = {
                name: entry.symbol,
                data: entry.data
            };
          })

          createChart();

        }); // end jquery wrapped functions

      }); //end of DataServices

    } else{
      // do nothing because no purchased
    }


  });





}; // end compositeChartCompCtrl

CompositeWatchlistCompCtrl.$inject = ['DataServices'];
