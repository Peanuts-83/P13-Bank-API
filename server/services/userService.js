const User = require('../database/models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.createUser = async serviceData => {
  try {
    const user = await User.findOne({ email: serviceData.email })
    if (user) {
      throw new Error('Email already exists')
    }

    const hashPassword = await bcrypt.hash(serviceData.password, 12)

    const newUser = new User({
      email: serviceData.email,
      password: hashPassword,
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
      transactions: serviceData.transactions,
    })

    let result = await newUser.save()

    return result
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.getUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOne({ _id: decodedJwtToken.id })

    if (!user) {
      throw new Error('User not found!')
    }

    return user.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.loginUser = async serviceData => {
  try {
    const user = await User.findOne({ email: serviceData.email })

    if (!user) {
      throw new Error('User not found!')
    }

    const isValid = await bcrypt.compare(serviceData.password, user.password)

    if (!isValid) {
      throw new Error('Password is invalid')
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || 'default-secret-key',
      { expiresIn: '1d' }
    )

    return { token }
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.updateUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        firstName: serviceData.body.firstName,
        lastName: serviceData.body.lastName
      },
      { new: true }
    )

    console.log('USER OBJECT -', user);
    if (!user) {
      throw new Error('User not found!')
    }

    return user.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}


module.exports.getUserTransactions = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOne({ _id: decodedJwtToken.id })
    let transactionsAll = user.transactions.map(trans => {
      delete trans.details
      return trans
    })
    if (!user) {
      throw new Error('User not found!')
    }
    if (!transactionsAll) {
      throw new Error('No transactions found!')
    }
    return transactionsAll.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}


module.exports.getUserTransactionID = async serviceData => {
  // console.log('getUserTransactionID STARTED');
  try {
    const transactionID = serviceData.url.split('transaction/')[1]
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOne({ _id: decodedJwtToken.id })
    // console.log('TR-ID -', user);

    let transactions = user.transactions
    let transaction = transactions
      .filter(trans => trans.id === transactionID)
      .map(obj => obj.details)[0]
    if (!user) {
      throw new Error('User not found!')
    }

    // console.log('TRANS-', transaction);
    if (!transactions) {
      throw new Error('No transactions found!')
    }
    return transaction
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}


module.exports.deleteUserTransactionID = async serviceData => {
  // console.log('deleteUserTransactionID STARTED');
  try {
    const transactionID = serviceData.url.split('transaction/')[1]
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        $set: {
          'transactions.$[elem].details': {
            type: '-',
            category: '-',
            notes: '-',
          }
        }
      },
      {
        useFindAndModify: false,
        arrayFilters: [{ 'elem.id': transactionID }],
        new: true
      }
    )

    // console.log('TRANS-', transaction);
    if (!user) {
      throw new Error('No transactions found!')
    }
    return user.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}


module.exports.updateUserTransactionID = async serviceData => {
  // console.log('updateUserTransactionID STARTED');
  try {
    const transactionID = serviceData.url.split('transaction/')[1]
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    // console.log('TR-ID -', transactionID, serviceData.body.data);

    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        $set: {
          'transactions.$[elem].details': {
            type: serviceData.body.data.newType,
            category: serviceData.body.data.newCategory,
            notes: serviceData.body.data.newNotes,
          }
        }
      },
      {
        useFindAndModify: false,
        arrayFilters: [{ 'elem.id': transactionID }],
        new: true
      }
    )

    if (!user) {
      throw new Error('Details not found!')
    }

    return user.transactions.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}