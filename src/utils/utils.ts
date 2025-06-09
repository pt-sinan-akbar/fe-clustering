export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

export const formatDecimal = (value: number | undefined): string => {
    if (value === undefined || value === null) {
        return 'N/A';
    }
    return value.toFixed(2);
};

export const formatAlgorithmName = (name: string): string => {
    if (name.includes('kmeans')) {
        return 'K-Means';
    }

    if (name.includes('hierarchical')) {
        return 'Hierarchical Clustering';
    }

    if (name.includes('gmm')) {
        return 'GMM';
    }

    if (name.includes('kprototypes')) {
        return 'K-Prototypes';
    }

    if (name.includes('dbscan')) {
        return 'DBSCAN';
    }

    return 'Unknown Algorithm';
}
