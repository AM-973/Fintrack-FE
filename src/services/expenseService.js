const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

const getByCategory = async (projectId, categoryId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}/categories/${categoryId}/expenses`, {
      headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to fetch expenses')
    return data
  } catch (err) {
    throw err
  }
}

const show = async (projectId, categoryId, expenseId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}/categories/${categoryId}/expenses/${expenseId}`, {
      headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to fetch expense')
    return data
  } catch (err) {
    throw err
  }
}

const create = async (formData, projectId, categoryId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}/categories/${categoryId}/expenses`, {
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

const update = async (formData, projectId, categoryId, expenseId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}/categories/${categoryId}/expenses/${expenseId}`, {
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

const deleteExpense = async (projectId, categoryId, expenseId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}/categories/${categoryId}/expenses/${expenseId}`, {
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