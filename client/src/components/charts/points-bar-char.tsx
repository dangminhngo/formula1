import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

import { RouterOutputs } from '~/lib/trpc'
import { formatDate } from '~/lib/utils'

export default function PointsBarChart({
  label = 'Standing',
  data,
}: {
  label?: string
  data:
    | RouterOutputs['driver']['inYear']['records']
    | RouterOutputs['team']['inYear']['records']
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const chart = new Chart(ref.current, {
      type: 'bar',
      options: {
        elements: {
          point: {
            radius: 4,
            hoverRadius: 8,
            backgroundColor: 'hsla(2, 100%, 60%, 0.8)',
            borderWidth: 2,
            hoverBorderWidth: 2,
          },
        },
        plugins: {
          legend: {
            labels: {
              color: '#94a3b8',
              font: { weight: '600' },
            },
          },
          tooltip: {
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 14,
            },
            backgroundColor: '#1e293b',
            callbacks: {
              label: (context) => {
                const d = data[context.dataIndex]
                return `Date: ${formatDate(d.grandPrix.date)} - Position: ${
                  d.position
                } - Points: ${context.raw}`
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: true, color: '#0f172a' },
            ticks: {
              color: '#94a3b8',
            },
          },
          y: {
            beginAtZero: true,
            grid: { display: true, color: '#0f172a' },
            ticks: {
              color: '#94a3b8',
              stepSize: 2,
            },
          },
        },
      },
      data: {
        labels: data.map((d) => d.grandPrix.location),
        datasets: [
          {
            label,
            data: data.map((d) => d.points),
            borderColor: 'hsl(2, 100%, 60%)',
            backgroundColor: 'hsla(2, 100%, 60%, 0.5)',
            hoverBackgroundColor: 'hsl(2, 100%, 60%)',
          },
        ],
      },
    })

    return () => chart.destroy()
  }, [data, label])

  return <canvas ref={ref} />
}
