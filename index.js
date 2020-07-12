d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json",function(error,data){
   if (error) throw error;
 //const datasetY = data.map(d =>d.Time);
   const datasetX = data.map(d =>d.Year);
   console.log(datasetX);
 const w = 950;
 const h = 500; 
 const padding = 100;
  function timeParse(a){
   let sec = parseInt(a.split(":")[0]) * 60 +
     parseInt(a.split(":")[1]);
   return sec
 };
  const time = data.map((d) => timeParse(d.Time));
 const xScale = d3.scaleLinear()
 .domain([d3.min(datasetX),d3.max(datasetX)])
 .range([padding,w-padding]);
  const yScale = d3.scaleLinear()
  .domain([d3.max(time),d3.min(time)])
  .range([h-padding,padding]);
  
   const title =  d3.select("#container")
  .append("id","title")
  .text("35 Fastest times up Alpe d'Huez")
  .style("font-size","20px")
  .style("font-family","Arial")
   .style("margin-left","380px");
  
   const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
   .style("opacity","0.8")
    .style("width", "200px")
   .style("font-family", "Arial")
    .style("font-size", "13px")
    .style("background-color", "#b9b8b8")
   .style("border-radius","5px")
   .style("text-align","center")
   .style("position","absolute")
  .style("visibility", "hidden");
  
    const svg = d3.select("#container")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
  
    svg.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("cx", (d,i)=> xScale(d.Year))
       .attr("cy",(d,i)=> yScale(timeParse(d.Time)))
       .attr("r", (d) => 6)
       .attr("fill",(d,i)=> {
      if (d.Doping==""){
        return "green"
      } else return "red"
    })
  
  .on("mouseover",(d)=>{  
tooltip.style("visibility","visible")
      .html(d.Name + ': ' + d. Nationality + "<br>" + "Year" + ":" + d.Year + " Time"  + ": " + d.Time +"<br>" +(d.Doping?"" + d.Doping:""))
       .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px")
      })
  
     
  .on("mouseout",(d, i)=>{
    tooltip.style("visibility","hidden");
  });
  
  
  
   const xAxis = d3.axisBottom(xScale).tickFormat(d=> d);
    const yAxis = 
d3.axisLeft(yScale).ticks(3).tickFormat(d => Math.floor(d / 60) + ":" + d % 60);
 
  
   svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis);
  
  svg.append("g")
       .attr("transform", "translate(" + (padding) + ",0)")
       .call(yAxis);

});