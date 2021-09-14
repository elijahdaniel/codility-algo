function solution(S) {
  let n = S.split(/[?!.]/)
    .filter(w => w.length > 0)
    .map(w => w.trim().split(' '))
    .map(w => {
      return w.filter(wrd => {
        if (!wrd.match(/ +/g)) {
          return wrd;
        }
      });
    })
    .map(w => w.length);

  return Math.max.apply(null, n);
}
// ------------------
const splitFormat = lines => {
  let map = new Map();
  let temp = '';
  let arr = [];

  for (let line of lines) {
    temp = line.split(', ');
    if (map.has(temp[1])) {
      arr = map.get(temp[1]);
      arr.push({
        date: new Date(temp[2]).getTime(),
        format: temp[0].split('.')[1],
      });
      map.set(temp[1], arr);
    } else {
      map.set(temp[1], [
        {
          date: new Date(temp[2]).getTime(),
          format: temp[0].split('.')[1],
        },
      ]);
    }
  }

  for (let [key, val] of map.entries()) {
    val.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
  }

  return map;
};

const getIndexNFormat = (map, city, time) => {
  let arr = map.get(city);
  let index = arr.findIndex(x => x.date == new Date(time).getTime());
  let format = arr[index].format;
  let zero = '';
  index += 1;
  let count = Math.floor(Math.log10(arr.length)) - Math.floor(Math.log10(index));

  for (let i = 0; i < count; i++) {
    zero += '0';
  }

  return `${zero + index + '.' + format}`;
};

function solution(S) {
  let str = '';
  let lines = S.split('\n');
  let map = splitFormat(lines);
  let temp = '';
  let city = '';
  let time = '';

  for (let line of lines) {
    temp = line.split(', ');
    city = temp[1];
    time = temp[2];
    indexNformat = getIndexNFormat(map, city, time);
    str += `${city + indexNformat + '\n'}`;
  }

  return str;
}
