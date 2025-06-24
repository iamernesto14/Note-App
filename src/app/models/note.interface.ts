export interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    isArchived: boolean;
    isDeleted: boolean;
    createdAt: Date;
}