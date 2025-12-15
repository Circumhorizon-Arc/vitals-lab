export interface Test {
    id: string;
    name: string;
    price: number;
    turnaroundTime: string;
    description: string;
    preparation: string;
    sampleType: string;
}

export interface Package {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    includes: string[];
    turnaroundTime: string;
    description: string;
}

export type TestOrPackage = (Test & { type: "test" }) | (Package & { type: "package" });
