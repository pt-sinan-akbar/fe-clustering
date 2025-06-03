<script setup lang="ts">
import Plotly from 'plotly.js-dist-min'
import type { Data, Layout } from 'plotly.js-dist-min'
import { onMounted, watch } from 'vue'

interface RFMData {
    id: string
    recency: number
    frequency: number
    monetary: number
    state?: string
    cluster: string
}

interface Props {
    rfmData: RFMData[]
}

const props = defineProps<Props>()

const createPlot = () => {
    if (!props.rfmData || props.rfmData.length === 0) return

    const clusters = [...new Set(props.rfmData.map(item => item.cluster))]
    
    const clusterColors = {
        '-1': '#f26b8d', 
        '0': '#f7a070',  
        '1': '#f38a7b',  
        '2': '#1a73a9',  
        '3': '#74a6a5'   
    }

    const traces = clusters.map(clusterVal => {
        const clusterData = props.rfmData.filter(item => item.cluster === clusterVal)
        
        return {
            x: clusterData.map(item => item.recency),
            y: clusterData.map(item => item.frequency),
            z: clusterData.map(item => item.monetary),
            mode: 'markers',
            type: 'scatter3d',
            name: `Cluster ${clusterVal}`,
            marker: {
                size: 8,
                color: clusterColors[clusterVal as keyof typeof clusterColors],
                line: {
                    color: 'rgba(217, 217, 217, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            },
            text: clusterData.map(item => 
                `Customer: ${item.id}<br>` +
                `Cluster: ${item.cluster}<br>` +
                `State: ${item.state || 'N/A'}<br>` +
                `Recency: ${item.recency}<br>` +
                `Frequency: ${item.frequency}<br>` +
                `Monetary: $${item.monetary}`
            ),
            hovertemplate: '%{text}<extra></extra>'
        }
    })

    const layout: Partial<Layout> = {
        scene: {
            xaxis: {
                title: {
                    text: 'Recency (days)',
                    font: { size: 14 }
                },
                backgroundcolor: 'rgb(230, 230, 230)',
                gridcolor: 'rgb(255, 255, 255)',
                showbackground: true,
                zerolinecolor: 'rgb(255, 255, 255)'
            },
            yaxis: {
                title: {
                    text: 'Frequency (transactions)',
                    font: { size: 14 }
                },
                backgroundcolor: 'rgb(230, 230, 230)',
                gridcolor: 'rgb(255, 255, 255)',
                showbackground: true,
                zerolinecolor: 'rgb(255, 255, 255)'
            },
            zaxis: {
                title: {
                    text: 'Monetary Value ($)',
                    font: { size: 14 }
                },
                backgroundcolor: 'rgb(230, 230, 230)',
                gridcolor: 'rgb(255, 255, 255)',
                showbackground: true,
                zerolinecolor: 'rgb(255, 255, 255)'
            }
        },
        margin: { l: 0, r: 0, b: 0, t: 50 },
        legend: {
            x: 1,
            y: 0,
            xanchor: 'left',
            yanchor: 'bottom',
            bgcolor: 'rgba(255, 255, 255, 0.6)',
            bordercolor: 'rgba(0, 0, 0, 0.2)',
            borderwidth: 1
        },
        title: {
            text: 'RFM Clustering Analysis',
            y: 0.96
        }
    }
    
    Plotly.newPlot('rfmDiv', traces as Data[], layout)
}

onMounted(() => {
    createPlot()
})

watch(() => props.rfmData, () => {
    createPlot()
}, { deep: true })
</script>

<template>
    <div id="rfmDiv" class="w-full bg-white shadow-md rounded-lgp-10">
    </div>
</template>