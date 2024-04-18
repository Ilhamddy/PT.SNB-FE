export interface INews{
    id: number,
    title: string,
    description: string,
    image: string,
    createdAt: Date,
    refreshPage: () => void;
}