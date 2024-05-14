export interface INews{
    id: number,
    title: string,
    source: string,
    description: string,
    image: string,
    createdAt: Date,
    refreshPage: () => void;
}