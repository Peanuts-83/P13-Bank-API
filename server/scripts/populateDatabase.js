const axios = require('axios')
const signupApi = 'http://localhost:3001/api/v1/user/signup'

const users = [
  {
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'tony@stark.com',
    password: 'password123',
    transactions: [
      {
        id: 'TS0001-0605', date: 'June 5th, 2021', description: 'Fleming & Co.', amount: 40, balance: 2147.79, details: {
          type: 'Furnitures',
          category: 'Office Furniture',
          notes: '1,000,000 trombones for Edith'
        }
      },
      {
        id: 'TS0002-0612', date: 'June 12th, 2021', description: 'Golden Sun Bakery', amount: 30, balance: 2187.79, details: {
          type: 'Representation',
          category: 'Food',
          notes: 'Biggest sausage EVER!\n My dream come true XD'
        }
      },
      {
        id: 'TS0003-0620', date: 'June 20th, 2021', description: 'Golden Sun Bakery', amount: 5, balance: 2217.79, details: {
          type: 'Representation',
          category: 'Food',
          notes: 'Pickles & wine...'
        }
      },
      {
        id: 'TS0004-0627', date: 'June 27th, 2021', description: 'Oil factory Inc.', amount: 10, balance: 2223.79, details: {
          type: 'Electronic',
          category: 'Services',
          notes: 'Annual refilling'
        }
      },
      {
        id: 'TS0005-0630', date: 'June 30th, 2021', description: 'Golden Sun Bakery', amount: 20, balance: 2233.79, details: {
          type: 'Representation',
          category: 'Food',
          notes: ''
        }
      },
    ]
  },
  {
    firstName: 'Steve',
    lastName: 'Rogers',
    email: 'steve@rogers.com',
    password: 'password456',
    transactions: [
      {
        id: 'TS0001-0605', date: 'June 5th, 2021', description: 'Yellow Mine Corp.', amount: 40, balance: 2147.79, details: {
          type: 'Other',
          category: 'Mecanics',
          notes: ''
        }
      },
      {
        id: 'TS0002-0612', date: 'June 12th, 2021', description: 'Brand Tobacco', amount: 30, balance: 2187.79, details: {
          type: 'Furnitures',
          category: 'Office Furniture',
          notes: ''
        }
      },
      {
        id: 'TS0003-0620', date: 'June 20th, 2021', description: 'Golden Sun Bakery', amount: 5, balance: 2217.79, details: {
          type: 'Representation',
          category: 'Food',
          notes: ''
        }
      },
      {
        id: 'TS0004-0627', date: 'June 27th, 2021', description: 'Yellow Mine Corp.', amount: 10, balance: 2223.79, details: {
          type: 'Other',
          category: 'Mecanics',
          notes: ''
        }
      },
      {
        id: 'TS0005-0630', date: 'June 30th, 2021', description: 'Yellow Mine Corp.', amount: 20, balance: 2233.79, details: {
          type: 'Other',
          category: 'Mecanics',
          notes: ''
        }
      },
    ]
  }
]

users.forEach(user => {
  axios
    .post(signupApi, user)
    .then(response => console.log(response))
    .catch(error => console.log(error))
})
