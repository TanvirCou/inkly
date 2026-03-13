'use client';

import { Post } from '@/lib/types/types';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#ec4899',
  '#14b8a6',
  '#f59e0b',
  '#10b981',
  '#3b82f6',
];

type Props = {
  posts: Post[];
};

export default function PostsByCategoryChart({ posts }: Props) {
  const categoryMap: Record<string, number> = {};
  posts.forEach((post) => {
    const rawCat = post.category || 'Uncategorized';
    const cat = rawCat.charAt(0).toUpperCase() + rawCat.slice(1);
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });

  const data = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-sm text-gray-400">
        No post data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
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
          formatter={(value: any, name: any) => [value, name]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '12px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
