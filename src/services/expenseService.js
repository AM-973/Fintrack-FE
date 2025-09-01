const BASE_URL = `${import.meta.env.FASTAPI_BACK_END_SERVER_URL}|| http://127.0.0.1:8000/api`

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

const getByCategory = async (categoryId) => {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}/expenses`, {
      headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to fetch expenses')
    return data
  } catch (err) {
    throw err
  }
}

const show = async (categoryId, expenseId) => {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}/expenses/${expenseId}`, {
      headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to fetch expense')
    return data
  } catch (err) {
    throw err
  }
}

const create = async (formData, categoryId) => {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}/expenses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to create expense')
    return data
  } catch (err) {
    throw err
  }
}

const update = async (formData, expenseId) => {
  try {
    const res = await fetch(`${BASE_URL}/expenses/${expenseId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to update expense')
    return data
  } catch (err) {
    throw err
  }
}

const deleteExpense = async (expenseId) => {
  try {
    const res = await fetch(`${BASE_URL}/expenses/${expenseId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error('Failed to delete expense')
    }
    return { message: 'Expense deleted successfully' }
  } catch (err) {
    throw err
  }
}

export {
  getByCategory,
  show,
  create,
  update,
  deleteExpense
}
