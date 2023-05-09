const mySum = require('./mySum')

const main = () => {
  console.log(mySum(1, 2, 3)) // 6

  const myArray = [1, 2, 3, 4, 5]
  const result = mySum(...myArray)
  console.log(result) // 15

  const mySecondArray = myArray.map((num) => num * 2)

  // calculate the average of mySecondArray
  const average = mySum(...mySecondArray) / mySecondArray.length

  mySecondArray.forEach((num) => {
    if (num > average) {
      console.log(num)
    }
  })

  setTimeout(() => {
    console.log('Goodbye')
  }, 3000)

  const Employee = {
    name: 'Kazuki',
    email: 'test@example.com',
    department: 'IT',
    startDate: '2023-01-01',
  }

  const { name, email } = Employee
  const Person = { name, email }
  console.log(Person)
}

main()
