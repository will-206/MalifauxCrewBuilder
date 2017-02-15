const fs = require('fs');

const json = fs.readFileSync('crewBuilder/src/malifauxData.json', "utf-8", function (err, content) {
  if (err) return callback(err)
  callback(null, content)
});
const data = JSON.parse(json);


function search(category, term) {
  let matches = 0;
  const matchArr = [];
  console.log('Searched "' + category + '" for "' + term + '"');

  for (let elem in data) {
    if (category === 'cost' || category === 'cache' || category === 'wave' || category === 'rank'){
      if (data[elem][category] == term) {
        matchArr.push(data[elem]);
        matches++;
      }
    } else {
      if (data[elem][category].includes(term)) {
        matchArr.push(data[elem]);
        matches++;
      }
    }
  }
  console.log(matches + ' Matches');
  return matchArr;
}

function test(){
  // console.log(search('name', 'Hound'));
  // console.log(search('faction', 'Guild'));
  // console.log(search('rank', 'Peon'));
  // console.log(search('characteristics', 'M&SU'));
  console.log(search('characteristics', 'Witch Hunter'));
  // console.log(search('cost', 0));
  // console.log(search('cache', 1));
  // console.log(search('wave', '1'));
}
test();
