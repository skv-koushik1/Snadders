
function getRandomNumbers(min, max) {
  let step1 = max - min + 1;
  let step2 = Math.random() * step1;
  let result = Math.floor(step2) + min;
  return result;
}

function createArrOfNum(start, end) {
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

function generator(srt, end) {
  let numArray = createArrOfNum(srt, end);
  console.log(numArray);

  if (numArray.length === 0) {
    console.log('New Picture Unavailable!');
    return;
  }
  let rand = getRandomNumbers(0, numArray.length - 1);
  let randomNum = numArray[rand];
  numArray.splice(rand, 1);
  console.log(randomNum);
  return randomNum;
}
