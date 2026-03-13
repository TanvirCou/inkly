'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = {
  users: number;
  posts: number;
  comments: number;
  inquiries: number;
};

const ITEMS = [
  { key: 'users', label: 'Users', color: '#6366f1' },
  { key: 'posts', label: 'Posts', color: '#8b5cf6' },
  { key: 'comments', label: 'Comments', color: '#a855f7' },
  { key: 'inquiries', label: 'Inquiries', color: '#ec4899' },
];

export default function PlatformOverviewChart({
  users,
  posts,
  comments,
  inquiries,
}: Props) {
  const data = [
    { name: 'Users', value: users },
    { name: 'Posts', value: posts },
    { name: 'Comments', value: comments },
    { name: 'Inquiries', value: inquiries },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="hsl(var(--border))"
          strokeOpacity={0.8}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          interval={0}
        />
        <YAxis
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: '12px',
            border: 'none',
            fontSize: '12px',
            boxShadow:
              '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
            padding: '6px 10px',
            backgroundColor: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
          }}
          itemStyle={{
            color: 'hsl(var(--foreground))',
            padding: '2px 0',
          }}
          labelStyle={{
            color: 'hsl(var(--muted-foreground))',
            marginBottom: '4px',
            fontWeight: 600,
          }}
          formatter={(value: any, name: any) => [value, name]}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
          {ITEMS.map((item, i) => (
            <Cell key={i} fill={item.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
