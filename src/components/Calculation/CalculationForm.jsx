import React, { useState } from 'react'
import { create } from "../../services/projectService"
import BarChartDisplay from '../Chart/PieChartDisplay'

function CalculationForm() {
  const [formData, setFormData] = useState({
    project_name: '',
    budget: '',
    goal_amount: '',
    months: '',
    description: '',
    plan_type: '',
  })
  const [calculation, setCalculation] = useState(null)
  const [actualSavings, setActualSavings] = useState([])
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const payload = {
        ...formData,
        budget: Number(formData.budget),
        goal_amount: Number(formData.goal_amount),
        months: Number(formData.months),
      }

      // Generate ideal plan for frontend immediately
      const idealPlan = generateIdealPlan(payload.goal_amount, payload.months)
      setCalculation(idealPlan)

      const result = await create(payload) // store project on backend
      console.log('Project created:', result)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleActualChange = (index, value) => {
    const updatedSavings = [...actualSavings]
    updatedSavings[index] = Number(value)
    setActualSavings(updatedSavings)

    // Recalculate plan based on actual savings
    const updatedPlan = updateProgress(calculation, updatedSavings)
    setCalculation(updatedPlan)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="project_name" placeholder="Project Name" onChange={handleChange} />
        <input name="budget" placeholder="Budget" type="number" onChange={handleChange} />
        <input name="goal_amount" placeholder="Goal Amount" type="number" onChange={handleChange} />
        <input name="months" placeholder="Months" type="number" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />

        <select name="plan_type" onChange={handleChange}>
          <option value="">Select Plan</option>
          <option value="savings">Savings</option>
          <option value="investment">Investment</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <button type="submit">Create Project</button>
      </form>

      {error && <div>{error}</div>}

      {calculation && (
        <>
          <h3>Log Actual Savings</h3>
          {calculation.map((m, idx) => (
            <input
              key={idx}
              type="number"
              placeholder={`Month ${m.month}`}
              value={actualSavings[idx] || ''}
              onChange={(e) => handleActualChange(idx, e.target.value)}
            />
          ))}

          <BarChartDisplay calculation={calculation} />
        </>
      )}
    </>
  )
}

export default CalculationForm
