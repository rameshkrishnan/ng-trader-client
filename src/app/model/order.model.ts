export class Order {
    id: number;
    creationTime: string;
    side: string;
    symbol: string;
    quantity: number;
    quantityPlaced: number;
    quantityExecuted: number;
    limitPrice: number;
    priority: string;
    status: string;
    traderId: string;
}
