const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

const getByProject = async (projectId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}/categories`, {
      headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to fetch categories')
    return data
  } catch (err) {
    throw err
  }
}

const show = async (projectId, categoryId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}/categories/${categoryId}`, {
      headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to fetch category')
    return data
  } catch (err) {
    throw err
  }
}

const create = async (formData, projectId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to create category')
    return data
  } catch (err) {
    throw err
  }
}

const update = async (formData, projectId, categoryId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}/categories/${categoryId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to update category')
    return data
  } catch (err) {
    throw err
  }
}

const deleteCategory = async (projectId, categoryId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}/categories/${categoryId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error('Failed to delete category')
    }
    return { message: 'Category deleted successfully' }
  } catch (err) {
    throw err
  }
}

export {
  getByProject,
  show,
  create,
  update,
  deleteCategory
}