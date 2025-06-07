import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Types
interface Customer {
    id: string
    recency: number
    frequency: number
    monetary: number
    state: string
    cluster: number
}

interface ClusteringResult {
    cluster: number
    customer_count: number
    percentage: number
    mid_west: number
    north: number
    northeast: number
    south: number
    southeast: number
}

interface AlgorithmParameter {
    name: string
    value: number | string | boolean
    type: 'number' | 'string' | 'boolean'
}

interface ClusteringMetrics {
    silhouette: number | null
    calinski_harabasz: number | null
    davies_bouldin: number | null
}

interface AlgorithmOverview {
    algorithm: string
    customers: Customer[]
    parameters: AlgorithmParameter[]
    metrics: ClusteringMetrics | null
    results: ClusteringResult[]
    loading: boolean
    error: string | null
    lastUpdated: Date | null
}

interface ApiResponse {
    customers: Customer[]
    metrics: ClusteringMetrics
    results: ClusteringResult[]
}

export const useClusteringStore = defineStore('clustering', () => {
    // State
    const algorithms = ref<Record<string, AlgorithmOverview>>({})
    const currentAlgorithm = ref<string>('')
    const globalLoading = ref<boolean>(false)

    // Getters
    const getAlgorithmOverview = computed(() => {
        return (algorithm: string): AlgorithmOverview | null => {
            return algorithms.value[algorithm] || null
        }
    })

    const getAllAlgorithms = computed((): AlgorithmOverview[] => {
        return Object.values(algorithms.value)
    })

    const getCurrentAlgorithmData = computed((): AlgorithmOverview | null => {
        if (!currentAlgorithm.value) return null
        return algorithms.value[currentAlgorithm.value] || null
    })

    const getAlgorithmCount = computed((): number => {
        return Object.keys(algorithms.value).length
    })

    const getCompletedAlgorithms = computed((): AlgorithmOverview[] => {
        return Object.values(algorithms.value).filter(algo =>
            !algo.loading && algo.customers.length > 0
        )
    })

    // API Mock (replace with actual API calls)
    const api = {
        runClustering: async (config: {
            algorithm: string;
            parameters?: Record<string, any>
        }): Promise<ApiResponse> => {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

            // Mock response data with more realistic clustering results
            const clusterCount = config.algorithm === 'DBSCAN' ? 4 : 3
            const totalCustomers = 100 + Math.floor(Math.random() * 400)

            const customers: Customer[] = Array.from({ length: totalCustomers }, (_, i) => ({
                id: `CUST_${String(i + 1).padStart(4, '0')}`,
                recency: Math.floor(Math.random() * 365) + 1,
                frequency: Math.floor(Math.random() * 50) + 1,
                monetary: Math.floor(Math.random() * 5000) + 100,
                state: ['mid_west', 'north', 'northeast', 'south', 'southeast'][Math.floor(Math.random() * 5)],
                cluster: Math.floor(Math.random() * clusterCount)
            }))

            const results: ClusteringResult[] = Array.from({ length: clusterCount }, (_, i) => {
                const clusterCustomers = customers.filter(c => c.cluster === i)
                const clusterSize = clusterCustomers.length

                return {
                    cluster: i,
                    customer_count: clusterSize,
                    percentage: (clusterSize / totalCustomers) * 100,
                    mid_west: clusterCustomers.filter(c => c.state === 'mid_west').length,
                    north: clusterCustomers.filter(c => c.state === 'north').length,
                    northeast: clusterCustomers.filter(c => c.state === 'northeast').length,
                    south: clusterCustomers.filter(c => c.state === 'south').length,
                    southeast: clusterCustomers.filter(c => c.state === 'southeast').length
                }
            })

            const metrics: ClusteringMetrics = {
                silhouette: Math.random() * 0.8 + 0.2, // 0.2 to 1.0
                calinski_harabasz: Math.random() * 500 + 100, // 100 to 600
                davies_bouldin: Math.random() * 2 + 0.5 // 0.5 to 2.5
            }

            return { customers, metrics, results }
        }
    }

    // Actions
    const setCurrentAlgorithm = (algorithm: string) => {
        currentAlgorithm.value = algorithm
    }

    const initializeAlgorithm = (algorithm: string) => {
        if (!algorithms.value[algorithm]) {
            algorithms.value[algorithm] = {
                algorithm,
                customers: [],
                parameters: [],
                metrics: null,
                results: [],
                loading: false,
                error: null,
                lastUpdated: null
            }
        }
    }

    const setAlgorithmLoading = (algorithm: string, loading: boolean) => {
        initializeAlgorithm(algorithm)
        algorithms.value[algorithm].loading = loading
    }

    const setAlgorithmError = (algorithm: string, error: string | null) => {
        initializeAlgorithm(algorithm)
        algorithms.value[algorithm].error = error
    }

    const runClustering = async (
        algorithm: string,
        parameters: Record<string, any> = {}
    ): Promise<void> => {
        try {
            initializeAlgorithm(algorithm)
            setAlgorithmLoading(algorithm, true)
            setAlgorithmError(algorithm, null)
            globalLoading.value = true

            const response = await api.runClustering({ algorithm, parameters })

            // Convert parameters to the expected format
            const formattedParameters: AlgorithmParameter[] = Object.entries(parameters).map(([name, value]) => ({
                name,
                value,
                type: typeof value as 'number' | 'string' | 'boolean'
            }))

            algorithms.value[algorithm] = {
                algorithm,
                customers: response.customers,
                parameters: formattedParameters,
                metrics: response.metrics,
                results: response.results,
                loading: false,
                error: null,
                lastUpdated: new Date()
            }

            setCurrentAlgorithm(algorithm)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
            setAlgorithmError(algorithm, errorMessage)
            console.error(`Error running ${algorithm}:`, error)
        } finally {
            setAlgorithmLoading(algorithm, false)
            globalLoading.value = false
        }
    }

    // Specific algorithm runners
    const runKMeans = async (n_clusters: number = 3, random_state: number = 42) => {
        await runClustering('K-Means', { n_clusters, random_state })
    }

    const runKPrototypes = async (n_clusters: number = 3, random_state: number = 42, init: "huang", gamma: 1.0, metric1="euclidean", metric2="euclidean") => {
        await runClustering('K-Prototypes', { n_clusters, random_state, init, gamma, metric1, metric2 })
    }

    const runDBSCAN = async (eps: number = 0.5, min_samples: number = 5) => {
        await runClustering('DBSCAN', { eps, min_samples })
    }

    const runHierarchical = async (n_clusters: number = 3, linkage: string = 'ward') => {
        await runClustering('Hierarchical', { n_clusters, linkage })
    }

    const runGaussianMixture = async (n_components: number = 3, random_state: number = 42) => {
        await runClustering('Gaussian Mixture', { n_components, random_state })
    }

    // Data manipulation methods
    const clearAlgorithm = (algorithm: string) => {
        if (algorithms.value[algorithm]) {
            delete algorithms.value[algorithm]
            if (currentAlgorithm.value === algorithm) {
                currentAlgorithm.value = ''
            }
        }
    }

    const clearAllAlgorithms = () => {
        algorithms.value = {}
        currentAlgorithm.value = ''
    }

    const updateAlgorithmMetrics = (algorithm: string, metrics: ClusteringMetrics) => {
        if (algorithms.value[algorithm]) {
            algorithms.value[algorithm].metrics = metrics
            algorithms.value[algorithm].lastUpdated = new Date()
        }
    }

    const updateCustomerCluster = (algorithm: string, customerId: string, newCluster: number) => {
        const algorithmData = algorithms.value[algorithm]
        if (!algorithmData) return

        const customer = algorithmData.customers.find(c => c.id === customerId)
        if (customer) {
            customer.cluster = newCluster
            recalculateResults(algorithm)
        }
    }

    const recalculateResults = (algorithm: string) => {
        const algorithmData = algorithms.value[algorithm]
        if (!algorithmData) return

        const clusterCounts: Record<number, number> = {}
        const stateCounts: Record<number, Record<string, number>> = {}

        // Count customers per cluster and state distribution
        algorithmData.customers.forEach(customer => {
            const cluster = customer.cluster
            clusterCounts[cluster] = (clusterCounts[cluster] || 0) + 1

            if (!stateCounts[cluster]) {
                stateCounts[cluster] = {
                    mid_west: 0,
                    north: 0,
                    northeast: 0,
                    south: 0,
                    southeast: 0
                }
            }

            if (stateCounts[cluster][customer.state] !== undefined) {
                stateCounts[cluster][customer.state]++
            }
        })

        const totalCustomers = algorithmData.customers.length

        // Update results
        algorithmData.results = Object.entries(clusterCounts).map(([cluster, count]) => ({
            cluster: parseInt(cluster),
            customer_count: count,
            percentage: (count / totalCustomers) * 100,
            mid_west: stateCounts[parseInt(cluster)].mid_west,
            north: stateCounts[parseInt(cluster)].north,
            northeast: stateCounts[parseInt(cluster)].northeast,
            south: stateCounts[parseInt(cluster)].south,
            southeast: stateCounts[parseInt(cluster)].southeast
        }))

        algorithmData.lastUpdated = new Date()
    }

    // Utility getters for specific algorithm data
    const getAlgorithmMetrics = (algorithm: string): ClusteringMetrics | null => {
        return algorithms.value[algorithm]?.metrics || null
    }

    const getAlgorithmResults = (algorithm: string): ClusteringResult[] => {
        return algorithms.value[algorithm]?.results || []
    }

    const getAlgorithmCustomers = (algorithm: string): Customer[] => {
        return algorithms.value[algorithm]?.customers || []
    }

    const getAlgorithmParameters = (algorithm: string): AlgorithmParameter[] => {
        return algorithms.value[algorithm]?.parameters || []
    }

    const getClusterDistribution = (algorithm: string): Record<number, number> => {
        const results = getAlgorithmResults(algorithm)
        return results.reduce((acc, result) => {
            acc[result.cluster] = result.customer_count
            return acc
        }, {} as Record<number, number>)
    }

    const getStateDistribution = (algorithm: string): Record<number, Record<string, number>> => {
        const results = getAlgorithmResults(algorithm)
        return results.reduce((acc, result) => {
            acc[result.cluster] = {
                mid_west: result.mid_west,
                north: result.north,
                northeast: result.northeast,
                south: result.south,
                southeast: result.southeast
            }
            return acc
        }, {} as Record<number, Record<string, number>>)
    }

    // Export functionality
    const exportAlgorithmResults = (algorithm: string) => {
        const algorithmData = algorithms.value[algorithm]
        if (!algorithmData) return

        const exportData = {
            algorithm: algorithmData.algorithm,
            parameters: algorithmData.parameters,
            metrics: algorithmData.metrics,
            customers: algorithmData.customers,
            results: algorithmData.results,
            summary: {
                total_customers: algorithmData.customers.length,
                cluster_count: algorithmData.results.length,
                last_updated: algorithmData.lastUpdated
            }
        }

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${algorithm.toLowerCase().replace(/\s+/g, '-')}-clustering-results.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const exportAllResults = () => {
        const exportData = {
            algorithms: algorithms.value,
            current_algorithm: currentAlgorithm.value,
            export_timestamp: new Date().toISOString(),
            summary: {
                total_algorithms: getAlgorithmCount.value,
                completed_algorithms: getCompletedAlgorithms.value.length
            }
        }

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `all-clustering-results-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return {
        // State
        algorithms,
        currentAlgorithm,
        globalLoading,

        // Getters
        getAlgorithmOverview,
        getAllAlgorithms,
        getCurrentAlgorithmData,
        getAlgorithmCount,
        getCompletedAlgorithms,

        // Actions
        setCurrentAlgorithm,
        runClustering,
        runKMeans,
        runDBSCAN,
        runHierarchical,
        runKPrototypes,
        runGaussianMixture,
        clearAlgorithm,
        clearAllAlgorithms,
        updateAlgorithmMetrics,
        updateCustomerCluster,
        recalculateResults,

        // Utility methods
        getAlgorithmMetrics,
        getAlgorithmResults,
        getAlgorithmCustomers,
        getAlgorithmParameters,
        getClusterDistribution,
        getStateDistribution,
        exportAlgorithmResults,
        exportAllResults
    }
})