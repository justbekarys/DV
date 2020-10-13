const DATA = [
    { id: 1, value: 10, name: "Kaz" },
    { id: 2, value: 5, name: "Rus" },
    { id: 3, value: 3, name: "Kyr" },
    { id: 4, value: 1, name: "Ukr" }
]

const listItems = d3.select('ul')
    .selectAll('li')
    .data(DATA, (data) => data.name)
    .enter()
    .append('li');

listItems.append('span')
    .text((data) => data.name);


const xScale = d3.scaleBand()
    .domain(DATA.map((dp) => dp.name)).rangeRound([0, 250]).padding(0.1);

const yScale = d3.scaleLinear().domain([0, 12]).rangeRound([0, 200]);


const container = d3.select("svg")
    .append('g')
    .call(d3.axisBottom(xScale))
    .attr('color', '#DD1111')

const bars = myFunction(DATA);

listItems
    .append('input')
    .attr('type', 'checkbox')
    .attr('checked', true)
    .attr('id', (data) => data.id)
    .on('change', (evnt) => {
        datas = d3.selectAll('.bar')
            .data();
        cid = parseInt(evnt.target.id);
        var filtered = datas.filter((el) => el.id !== cid);
        if (datas.length == filtered.length) {
            filtered.push(DATA.filter((el) => el.id == cid)[0]);
            myFunction(filtered)
        } else {
            container
                .selectAll(".bar")
                .data(filtered, data => data.name)
                .exit()
                .remove();
        }
    });

function myFunction(datas) {
    return container
        .selectAll(".bar")
        .data(datas, data => data.name)
        .enter()
        .append('rect')
        .classed('bar', true)
        .attr('width', xScale.bandwidth())
        .attr('height', data => yScale(data.value))
        .attr('x', data => xScale(data.name))
        .attr('y', data => 200 - yScale(data.value));
}