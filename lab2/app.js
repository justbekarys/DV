const Data = {
  items: [],
  addItem(item) {
    this.items.push(item);
  },
  removeItem(index) {
    this.items.splice(index,1);
  },
  updateItem(index, val) {
    this.items[index] = val;
  }
}

Data.addItem("Uzb");
Data.addItem("Ukr");
Data.addItem("Kaz");
Data.addItem("Kyr");
console.log(Data.items);

d3.select('ul')
.selectAll('li')
.data(Data.items)
.enter()
.append('li')
.text(data=>data);

setTimeout(()=>{
  Data.addItem('Azb');
  d3.select('ul')
  .selectAll('li')
  .data(Data.items)
  .enter()
  .append('li')
  .text(data=>data);
},2000);

setTimeout(()=>{
  console.log(Data.items);
  Data.removeItem(0);
  console.log(Data.items);
  d3.select('ul')
  .selectAll('li')
  .data(Data.items, data=>data)
  .exit()
  .remove()
}, 3000);

setTimeout(()=>{
  console.log(Data.items);
  Data.removeItem(0);
  console.log(Data.items);
  d3.select('ul')
  .selectAll('li')
  .data(Data.items, data=>data)
  .exit()
  .classed('redun',true)
}, 4000);

setTimeout(()=>{
  console.log(Data.items);
  Data.updateItem(1,'Rus');
  console.log(Data.items);

  d3.select('ul')
  .selectAll('li')
  .data(Data.items, data=>data)
  .exit()
  .classed('updated',true)
  .text('Rus');
}, 5000);
