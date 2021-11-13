import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartTooltip,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
  } from "@progress/kendo-react-charts";
  import React, {useState, useEffect} from "react";
  

  var COLORS = [
    "#059669",
    "#B91C1C",
    "#6366F1",
    "#2563EB",
    "#D97706",
    "#FF1493",
    "#66CDAA",
    "#DAA520"
  ];

  // Graph data
  const applicationsStatusThisMonth = [
    {
      status: "Accepted",
      value: 14,
      color: COLORS.accepted,
    },
    {
      status: "Interviewing",
      value: 14,
      color: COLORS.interviewing,
    },
    {
      status: "Rejected",
      value: 40,
      color: COLORS.rejected,
    },
    {
      status: "Pending",
      value: 32,
      color: COLORS.pending,
    },
  ];
  
  
  // Show category label for each item in the donut graph
  const labelContent = e => e.category;
  
  const Statistic = (props) => {


    const [Statistic, setStatistic] = useState([])

    

    useEffect(()=> {
      if (props.option == "recipes"){
        parserRecipes()
      }
      else{
        parserIngr()
      }

      
    },[props.recipes])

    const parserRecipes = () => {
      let recipes = props.recipes
      console.log(recipes);
      
      let stat = []
      let categoryes = []

      recipes.forEach(element => {
        categoryes.push(element.category)
      });

      categoryes = categoryes.filter(function(item, pos) {
        return categoryes.indexOf(item) == pos;
      })

      categoryes.forEach(cat => {
        let num = 0
        recipes.forEach(i => {
          if (cat == i.category){
            num+=1
          }
        });
        stat.push({name:cat, colvo: num})
      });

      let statarray = []

      let i = 0
      stat.forEach(element => {
        i+=1
        statarray.push({status: element.name, value: element.colvo, color: COLORS[i]})
      });

      setStatistic(statarray)
      
    }

    const parserIngr = () => {
      let recipes = props.recipes
      let recipesNames = []
      let Statistic = []

      recipes.forEach(element => {
        recipesNames.push({name: element.name, colvo: element.ingredients.split(',').length})
      });

      let i = 0
      recipesNames.forEach(element => {
        i+=1
        Statistic.push({
          status: element.name,
          value:  element.colvo,
          color: COLORS[i]
        })
      });

      setStatistic(Statistic)
    }
  
    

    return (
      <div>
      <button ></button>
      <Chart className={props.className}>
        <ChartTitle text={props.title} />
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={Statistic}
            categoryField="status"
            field="value"
          >
            <ChartSeriesLabels
              color="#fff"
              background="none"

              content={labelContent}
            />
          </ChartSeriesItem>
        </ChartSeries>
      </Chart>
      </div>
    );
  };
  
  export default Statistic;