import {useEffect, useRef} from 'react'
import Chart from 'chart.js/auto'

const SalesChart = ({values}) => {
    const chartRef = useRef(null)

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d')
        const data = {
            labels: values.map(item => new Date(item.date).toLocaleDateString('sk-SK', {
                day: '2-digit',
                month: '2-digit',
            })),
            datasets: [
                {
                    label: 'Celková cena',
                    data: values.map(item => item.totalPrice),
                    borderColor: '#02C9D5',
                    backgroundColor: 'transparent',
                },
            ],
        }

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            borderWidth: 6,
            plugins: {
                legend: {
                    display: false,
                },
            },
        }

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: options,
        })

        return () => {
            // Cleanup chart resources if needed
        }
    }, [])

    return <canvas
        ref={chartRef}
        style={{minHeight: '40vh'}}
    />
}

export default SalesChart
