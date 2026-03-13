'use client';

import { Post } from '@/lib/types/types';
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
  posts: Post[];
};

export default function TopPostsByViewsChart({ posts }: Props) {
  const sorted = [...posts]
    .sort((a, b) => b.visit - a.visit)
    .slice(0, 5)
    .map((post) => {
      const displayTitle =
        post.title.length > 22 ? post.title.slice(0, 22) + '…' : post.title;
      return {
        name: displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1),
        views: post.visit,
      };
    });

  if (sorted.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-sm text-gray-400">
        No post data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 0, right: 30, left: 10, bottom: 10 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
          stroke="hsl(var(--border))"
          strokeOpacity={0.8}
        />
        <XAxis
          type="number"
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          hide={true}
        />
        <YAxis
          dataKey="name"
          type="category"
          width={130}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
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
          formatter={(value: any) => [value, 'Views']}
        />
        <Bar dataKey="views" radius={[0, 6, 6, 0]} maxBarSize={18}>
          {sorted.map((_, i) => (
            <Cell key={i} fill={`hsl(${245 + i * 12}, 70%, ${62 - i * 3}%)`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
