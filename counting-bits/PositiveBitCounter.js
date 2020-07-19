function Count (input) {
  if(input < 0)
  {
    throw new RangeError('Input is negative number');
  }
  let inverseBinaryNumber = reverseBinaryNumber(input);
  return countBinaries (inverseBinaryNumber);
}

function reverseBinaryNumber(input) {
  input.toString(2).split("").reverse();
}

function countBinaries(inverseBinaryNumber) {
  let bitsCount = [0];
  for(let i = 0; i < inverseBinaryNumber.length; i++)
  {
    if(inverseBinaryNumber[i] == "1")
    {
      bitsCount[0]++;
      bitsCount.push(i);
    }
  }
}

module.exports = { Count }
