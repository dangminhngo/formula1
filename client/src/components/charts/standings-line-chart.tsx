import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { useNavigate } from 'react-router-dom'

export default function StandingsLineChart({
  label = 'Standing',
  childPath,
  data,
}: {
  label?: string
  childPath: string
  data: { year: number; standing: number }[]
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!ref.current) return

    const chart = new Chart(ref.current, {
      type: 'line',
      options: {
        // @link https://www.youtube.com/watch?v=8FcRkIKlI-8
        onClick: (e) => {
          if (!e.native) return
          const points = chart.getElementsAtEventForMode(
            e.native,
            'nearest',
            { intersect: true },
            true
          )

          if (!points[0]) return

          const d = data[points[0].index]

          navigate(`/${d.year}/${childPath}?highlight=${d.standing}`)
        },
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
            ticks: {
              color: '#94a3b8',
            },
          },
          y: {
            grid: { display: true, color: '#0f172a' },
            reverse: true,
            ticks: {
              color: '#94a3b8',
              stepSize: 2,
            },
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
  }, [data, label, childPath, navigate])

  return <canvas ref={ref} />
}
