var margin = 200;
var svg = d3.select("svg");
var width = svg.attr("height") - margin;
var height = svg.attr("height") - margin;

svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", 0)
    .attr("y", 50)
    .attr("class", "title")
    .text("Естественный прирост населения в Казахстане (на 1000)");

var xScale = d3.scaleBand().range([0, width]).padding(0.4);
var yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g");
g.attr("transform", "translate(100,100)");

var data = [
    { year: 2010, growth: 13.6, births: 367752 ,deceased: 145875},
    { year: 2011, growth: 13.8, births: 372544 ,deceased: 144213},
    { year: 2012, growth: 14.1, births: 379121 ,deceased: 141220},
    { year: 2013, growth: 14.7, births: 393421 ,deceased: 137630},
    { year: 2014, growth: 15.5, births: 401066 ,deceased: 132236},
    { year: 2016, growth: 15.6, births: 400640 ,deceased: 131373},
    { year: 2017, growth: 14.4, births: 390520 ,deceased: 130033},
    { year: 2019, growth: 14.6, births: 403064 ,deceased: 133489},
];

xScale.domain(data.map(function(d) { return d.year; }));
yScale.domain([0, d3.max(data, function(d) { return d.growth; })]);

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));


g.append("g")
    .call(d3.axisLeft(yScale));

var defaultText = "Для получения точной информации наведите курсор мыши на любой столбец диаграммы."

function onMouseOver(d, i) {
    d3.select(this)
        .attr('class', 'highlight');

    d3.select('.info')
        .text(i.year + " году Кол-во родившихся в Кз " + i.births + "человек, Кол-во умерших - " + i.deceased + "человек");

    d3.select(this)
        .transition()
        .duration(500)
        .attr('width', xScale.bandwidth() + 5)
        .attr("y", (d) => yScale(d.growth) - 10)
        .attr("height", (d) => height - yScale(d.growth) + 10);

}

function onMouseOut(d, i) {
    d3.select(this)
        .attr('class', 'bar');

    d3.select('.info')
        .text(defaultText);

    d3.select(this)
        .transition()
        .duration(500)
        .attr('width', xScale.bandwidth())
        .attr("y", (d) => yScale(d.growth))
        .attr("height", (d) => height - yScale(d.growth));


}


g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .on("mouseover", onMouseOver)
    .on("mouseout", onMouseOut)
    .attr("x", (d) => xScale(d.year))
    .attr("y", (d) => yScale(d.growth))
    .attr("width", xScale.bandwidth())
    .transition()
    .ease(d3.easeLinear)
    .duration(500)
    .delay((d, i) => i * 50)
    .attr("height", (d) => height - yScale(d.growth));

svg.append("text")
    .attr("x", 100)
    .attr("y", 450)
    .attr("class", "info")
    .text(defaultText);