import { useState, useEffect } from 'react';
import { POPULAR_TESTS, HEALTH_PACKAGES, ROUTINE_PATHOLOGY_TESTS } from '@/lib/data';

export type TestItem = {
    id: string;
    name: string;
    price: number;
    description: string;
    turnaroundTime: string;
    sampleType?: string;
    preparation?: string;
    category: 'Popular' | 'Routine' | 'Package';
    includes?: string[];
    originalPrice?: number;
};

export const useTests = () => {
    const [tests, setTests] = useState<TestItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTests = () => {
            const savedTests = localStorage.getItem('tests_data');
            if (savedTests) {
                setTests(JSON.parse(savedTests));
            } else {
                // Initialize from static data
                const initialTests: TestItem[] = [
                    ...POPULAR_TESTS.map(t => ({ ...t, category: 'Popular' as const })),
                    ...ROUTINE_PATHOLOGY_TESTS.map(t => ({ ...t, category: 'Routine' as const })),
                    ...HEALTH_PACKAGES.map(p => ({
                        ...p,
                        category: 'Package' as const,
                        sampleType: 'Blood/Urine', // Default for packages
                        preparation: 'Check individual tests'
                    }))
                ];
                setTests(initialTests);
                localStorage.setItem('tests_data', JSON.stringify(initialTests));
            }
            setLoading(false);
        };

        loadTests();

        const handleUpdate = () => loadTests();
        window.addEventListener('tests-updated', handleUpdate);
        return () => window.removeEventListener('tests-updated', handleUpdate);
    }, []);

    const saveTests = (newTests: TestItem[]) => {
        setTests(newTests);
        localStorage.setItem('tests_data', JSON.stringify(newTests));
        window.dispatchEvent(new Event('tests-updated'));
    };

    const addTest = (test: TestItem) => {
        const newTests = [...tests, test];
        saveTests(newTests);
    };

    const updateTest = (updatedTest: TestItem) => {
        const newTests = tests.map(t => t.id === updatedTest.id ? updatedTest : t);
        saveTests(newTests);
    };

    const deleteTest = (id: string) => {
        const newTests = tests.filter(t => t.id !== id);
        saveTests(newTests);
    };

    return { tests, loading, addTest, updateTest, deleteTest };
};
