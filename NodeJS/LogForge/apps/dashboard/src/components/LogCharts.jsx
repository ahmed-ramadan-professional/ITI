import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { BarChart3 } from 'lucide-react';

const LEVELS = [
  { name: 'INFO', className: 'distribution-info', color: 'var(--info)' },
  { name: 'WARN', className: 'distribution-warning', color: 'var(--warning)' },
  { name: 'ERROR', className: 'distribution-danger', color: 'var(--danger)' }
];

export function LogCharts({ totalsByLevel = {}, dailySeries = [], from, to, onDateChange, dateError }) {
  const total = LEVELS.reduce((sum, level) => sum + (totalsByLevel[level.name] || 0), 0);

  return (
    <div className="analytics-grid">
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2 className="section-title">System performance</h2>
            <p className="section-description">Event totals by log level</p>
          </div>
        </div>
        <div className="analytics-dates">
          <label className="field">
            <span className="field-label">From</span>
            <input aria-label="from date" type="date" className="input" value={from} onChange={(event) => onDateChange('from', event.target.value)} />
          </label>
          <label className="field">
            <span className="field-label">To</span>
            <input aria-label="to date" type="date" className="input" value={to} onChange={(event) => onDateChange('to', event.target.value)} />
          </label>
          {dateError ? <p className="form-error col-span-full m-0">{dateError}</p> : null}
        </div>
        {dailySeries.length > 0 && !dateError ? (
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={276} minWidth={0}>
              <LineChart data={dailySeries} margin={{ top: 8, right: 14, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    border: '1px solid var(--border)',
                    borderRadius: 7,
                    background: 'var(--surface)',
                    boxShadow: 'var(--shadow)',
                    color: 'var(--text)'
                  }}
                />
                <Legend wrapperStyle={{ color: 'var(--text-muted)', fontSize: 12 }} />
                {LEVELS.map((level) => (
                  <Line
                    key={level.name}
                    type="monotone"
                    dataKey={level.name}
                    stroke={level.color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="empty-state min-h-[276px]">
            <div>
              <BarChart3 color="var(--text-faint)" size={24} />
              <h3>No analytics to chart</h3>
              <p>{dateError ? 'Correct the selected date range to load analytics.' : 'Adjust the filters or send logs to this application.'}</p>
            </div>
          </div>
        )}
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2 className="section-title">Level distribution</h2>
            <p className="section-description">Filtered event volume</p>
          </div>
        </div>
        <div className="panel-body distribution">
          <div className="distribution-chart">
            {total ? (
              <ResponsiveContainer width="100%" height={190} minWidth={0}>
                <PieChart>
                  <Pie
                    data={LEVELS.map((level) => ({
                      name: level.name,
                      value: totalsByLevel[level.name] || 0,
                      color: level.color
                    }))}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={56}
                    outerRadius={78}
                    paddingAngle={2}
                    stroke="var(--surface)"
                    strokeWidth={2}
                  >
                    {LEVELS.map((level) => (
                      <Cell fill={level.color} key={level.name} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      border: '1px solid var(--border)',
                      borderRadius: 7,
                      background: 'var(--surface)',
                      boxShadow: 'var(--shadow)',
                      color: 'var(--text)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="distribution-empty">No events</div>
            )}
            {total ? (
              <div className="distribution-total-wrap">
                <p className="distribution-total">{total.toLocaleString()}</p>
                <p>Total events</p>
              </div>
            ) : null}
          </div>
          <div className="distribution-list">
            {LEVELS.map((level) => {
              const value = totalsByLevel[level.name] || 0;
              return (
                <div className="distribution-row" key={level.name}>
                  <span className={`distribution-swatch ${level.className}`} />
                  <span>{level.name}</span>
                  <strong className="text-[var(--text)]">
                    {value.toLocaleString()} {total ? `(${Math.round((value / total) * 100)}%)` : ''}
                  </strong>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
