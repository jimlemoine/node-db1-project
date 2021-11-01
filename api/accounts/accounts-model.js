const db = require('../../data/db-config.js');

const getAll = async () => {
  const result = await db('accounts')
  return result
}

const getById = async id => {
  const result = await db('accounts').where('id', id).first()
  return result
}

const create = async account => {
  const [id] = await db('accounts').insert(account)
  const newAccount = await getById(id)
  return newAccount
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = async id => {
  const deletedAccount = await getById(id)
  await db('accounts').where('id', id).del()
  return deletedAccount
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
