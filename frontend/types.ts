type User = {
    _id: number;
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    role: string;
    created_at: Date;
    updated_at: Date;
};

type Reports = {
    _id: string;
    user: User;
    severity: string;
    totalVotes: string | undefined;
    yesVotes: string;
    noVotes: string;
    location: [number];
    address: string;
    created_at: Date;
    updated_at: Date;
};


type Complaint = {
    _id: string;
    clusers: [Cluster];
    location: string;
    submittedTo: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}

type Cluster = {
    _id:string;
    reports:[Reports];
    reportCount: number;
    isValid: boolean;
    created_at: Date;
    updated_at: Date;
}

type UserDetails = {
    _id: number;
    firstName: string;
    lastName: string;
    email: string;
    contact: null | string;
    role: string;
    created_at: Date;
    updated_at: Date;
};


type ReportDetails = {
    _id: string;
    user: User;
    severity: string;
    totalVotes: string | undefined;
    yesVotes: string;
    noVotes: string;
    location: [number];
    address: string;
    created_at: Date;
    updated_at: Date;
};

type ComplaintDetails={
    _id: string;
    clusers: [Cluster];
    location: string;
    submittedTo: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}