import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function StandingsLineChart({
  label = 'Standing',
  data,
}: {
  label?: string
  data: { year: number; standing: number }[]
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const chart = new Chart(ref.current, {
      type: 'line',
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
          tooltip: {
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 14,
            },
            backgroundColor: '#1e293b',
          },
        },
        scales: {
          x: {
            grid: { display: true, color: '#0f172a' },
          },
          y: {
            grid: { display: true, color: '#0f172a' },
            reverse: true,
          },
        },
      },
      data: {
        labels: data.map((d) => d.year),
        datasets: [
          {
            label,
            data: data.map((d) => d.standing),
            fill: false,
            borderColor: 'hsl(2, 100%, 60%)',
            tension: 0.1,
          },
        ],
      },
    })

    return () => chart.destroy()
  }, [data, label])

  return <canvas ref={ref} />
}
