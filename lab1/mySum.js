const mySum = (...nums) => {
  let sum = 0
  for (let num of nums) {
    sum += num
  }
  return sum
}

module.exports = mySum
