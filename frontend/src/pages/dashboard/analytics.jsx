import { useEffect, useState } from "react";
import { theme } from "../../styles/theme";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "../../features/services/apiClient";

const COLORS = ["#628141", "#8BAE66", "#EBD5AB"];

export default function AnalyticsDashboard() {
  const [summary, setSummary] = useState(null);
  const [timeseries, setTimeseries] = useState([]);
  const [breakdown, setBreakdown] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [s, t, b] = await Promise.all([
        api.get("/api/activity/summary"),
        api.get("/api/activity/timeseries"),
        api.get("/api/activity/breakdown"),
      ]);

      setSummary(s.data);
      setTimeseries(t.data);
      setBreakdown(b.data);
    };

    load();
  }, []);

  if (!summary) return <div style={{ padding: 40 }}>Loading...</div>;

  const totals = summary.totals || {};
  const cats = summary.categories || {};

  return (
    <div style={theme.chartContainer}>
      <h1 style={theme.title}>Dashboard</h1>

      {/* SUMMARY CARDS */}
      <div style={theme.grid}>
        <Card label="Focus Time" value={format(totals.focusTime)} />
        <Card label="Study Time" value={format(totals.studyTime)} />
        <Card label="Feed Time" value={format(totals.feedTime)} />

        <Card
          label="Focus Sessions"
          value={cats.focus?.sessions || 0}
        />
        <Card
          label="Study Sessions"
          value={cats.study?.sessions || 0}
        />
        <Card
          label="Posts Viewed"
          value={totals.totalPostsViewed || 0}
        />
      </div>

      {/* CHARTS */}
      <div style={theme.charts}>
        <div style={theme.chartBox}>
          <h3>Activity Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={timeseries}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="time"
                stroke="#8BAE66"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={theme.chartBox}>
          <h3>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={breakdown}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {breakdown.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ───────────────── COMPONENTS ───────────────── */

function Card({ label, value }) {
  return (
    <div style={theme.chartCard}>
      <div style={theme.cardLabel}>{label}</div>
      <div style={theme.cardValue}>{value}</div>
    </div>
  );
}

/* ───────────────── UTILS ───────────────── */

function format(sec = 0) {
  const m = Math.floor(sec / 60);
  const h = Math.floor(m / 60);
  return h ? `${h}h ${m % 60}m` : `${m}m`;
}