const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if ( !name || !budget) {
    res.status(400).json({ message: 'name and budget are required, budget must be a number' })
  } else if (typeof name !== 'string') {
    res.status(400).json({ message: 'name of account must be a string' })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: 'name of account must be between 3 and 100' })
  } else if (typeof budget !== 'number') {
    res.status(400).json({ message: 'budget of account must be a number' })
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: 'budget of account is too large or too small' })
  } else {
    req.body = {...req.body, name: req.body.name.trim()}
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body
  const accounts = await Account.getAll()
  const dupe = accounts.find(account => account.name.trim() === name.trim())
  if (dupe) {
    next({ status: 400, message: 'that name is taken' })
  } else {
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const possibleAccount = await Account.getById(req.params.id)
    if (possibleAccount) {
      req.validAccount = possibleAccount
      next()
    } else {
      next({ status: 404, message: 'account not found' })
    }
  } catch (err) {
    next(err)
  }
}
