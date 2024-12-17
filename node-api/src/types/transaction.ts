export type Transaction = {
    id: string,
    accountId: string,
    customerId: string,
    transactionType: number,
    amount: number
    isCompleted: boolean,
    isCanceled: boolean,
    createdOn: Date,
    createdBy: string,
    updatedOn: Date,
    updatedBy: string,
}