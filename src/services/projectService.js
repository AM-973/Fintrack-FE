const BASE_URL = `${import.meta.env.FASTAPI_BACK_END_SERVER_URL}`

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/projects`, {
      headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to fetch projects')
    return data
  } catch (err) {
    throw err
  }
}

const show = async (projectId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
      headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to fetch project')
    return data
  } catch (err) {
    throw err
  }
}

const create = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to create project')
    return data
  } catch (err) {
    throw err
  }
}

const update = async (formData, projectId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error('Failed to update project')
    return data
  } catch (err) {
    throw err
  }
}

const deleteProject = async (projectId) => {
  try {
    const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    if (!res.ok) {
      throw new Error('Failed to delete project')
    }
    return { message: 'Project deleted successfully' }
  } catch (err) {
    throw err
  }
}

export {
  index,
  show,
  create,
  update,
  deleteProject
}
