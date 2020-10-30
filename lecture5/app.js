const width = 1440;
const height = 1536;
var xScale = d3.scaleLinear().range([0, width]);
var yScale = d3.scaleLinear().range([0, height]);

var tip = d3.tip().attr("class", "d3-tip").html((d) => d);

var svg = d3.select("svg");
svg.attr("width", width);
svg.attr("height", height);
svg.attr("transform", 'translate(100,50)');

svg.call(tip);


d3.json("http://localhost:8000/data.json").then((data) => {
    console.log(data);
    var maxYScale = d3.max(
        data.map((d) => d.length)
    );
    console.log("maxYScale", maxYScale);
    xScale.domain([0, data.length])
    yScale.domain([0, maxYScale]);

    links = []
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data[i].length; j++) {
            for (let k = 0; k < data[i + 1].length; k++) {
                if (data[i][j] == data[i + 1][k]) {
                    links.push([
                        [xScale(i), yScale(j)],
                        [xScale(i + 1), yScale(k)]
                    ]);
                }
            }
        }
    }

    console.log(links);

    var sozyvs = svg
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "sozyv")
        .attr("transform", (d, i) => `translate(${xScale(i)},0)`)


    function onmouseout(d, i, e) {
        d3.select(this)
            .attr('class', "member");
        tip.hide();
    }

    function onmouseover(d, i, e) {
        d3.select(this)
            .attr('class', "hl");
        tip.show(d, e[i]);
    }

    sozyvs
        .selectAll("rect")
        .data((d, i) => d)
        .enter()
        .append("rect")
        .attr("class", "member")
        .attr("y", (d, j) => yScale(j))
        .attr("x", 0)
        .attr("width", 5)
        .attr("height", 5)
        .attr("name", (d, j) => d)
        .on("mouseover", onmouseover)
        .on("mouseout", onmouseout);

    var lineGenerator = d3.line().curve(d3.curveCardinal);

    svg.selectAll("path")
        .data(links)
        .enter()
        .append('path')
        .attr("d", (d, i) => lineGenerator(d));
});