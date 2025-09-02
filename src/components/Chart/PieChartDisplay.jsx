import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#33AA77"];

function PieCharts({ projectId }) {
  const [expensesData, setExpensesData] = useState([]);
  const [calcData, setCalcData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Fetch project with categories + expenses
        const res = await fetch(`http://localhost:8000/api/projects/${projectId}`);
        const project = await res.json();

        // ----- Pie 1: Expenses -----
        const expenses = project.categories.map((c) => ({
          name: c.name,
          value: c.expenses.reduce((sum, e) => sum + e.amount, 0),
        }));
        setExpensesData(expenses);

        // ----- Pie 2: Remainder → backend calc -----
        const totalExpenses = expenses.reduce((sum, e) => sum + e.value, 0);
        const remainder = project.budget - totalExpenses;

        if (remainder > 0) {
          const calcRes = await fetch(
            `http://localhost:8000/api/projects/${projectId}/calculate`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                budget: remainder,
                plan_type: project.plan_type,
                extra_config: project.extra_config || {},
              }),
            }
          );

          const calc = await calcRes.json();

          const transformed = Object.entries(calc).map(([key, value]) => ({
            name: key,
            value: typeof value === "number" ? value : 0,
          }));

          setCalcData(transformed);
        } else {
          setCalcData([{ name: "Expenses exceeded", value: totalExpenses }]);
        }
      } catch (err) {
        console.error("Error loading pie charts:", err);
      }
    }

    fetchData();
  }, [projectId]);

  const renderPie = (data, title) => {
    if (!data || data.length === 0) return null;

    return (
      <div style={{ margin: "20px" }}>
        <h3>{title}</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {renderPie(expensesData, "Expenses Breakdown")}
      {renderPie(calcData, "Plan Allocation (Remainder)")}
    </div>
  );
}

export default PieCharts;
