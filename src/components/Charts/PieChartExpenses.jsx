import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import * as categoryService from "../../services/categoryService";
import * as expenseService from "../../services/expenseService";
import styles from "./PieChartDisplay.module.css";

const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#FFBB28", "#AA336A", "#33AA77", "#FF33AA", "#3366FF"];

const PieChartDisplay = () => {
  const { projectId, categoryId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch categories

        // Fetch expenses for selected category (if categoryId exists)
        if (categoryId) {
          const expensesData = await expenseService.getByCategory(projectId, categoryId);
          setExpenses(expensesData);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load chart data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [projectId, categoryId]);

  if (loading) return <div className={styles.loading}>Loading chart data...</div>;
  if (error) return <div className={styles.error}>{error}</div>;


  // Prepare data for Expenses Breakdown PieChart
  const expensesChartData = expenses.map((e) => ({
    name: e.name,
    value: e.amount,
  }));

  return (
    <main className={styles.container}>
      <div className={styles.chartsWrapper}>
        {categoryId && (
          <div className={styles.chartCard}>
            <h2> Current Category Expense Breakdown</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={expensesChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#82ca9d"
                label={(entry) => entry.name}
              >
                {expensesChartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${(value / 100).toFixed(2)}`} />
              <Legend />
            </PieChart>
          </div>
        )}
      </div>
    </main>
  );
};

export default PieChartDisplay;
