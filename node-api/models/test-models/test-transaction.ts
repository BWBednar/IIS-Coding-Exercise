export const testIncompleteDeposit = {
    id: '11111111-2222-4444-3333-222222222222',
    accountId: '87654321-4321-4321-4321-210987654321',
    customerId: '12345678-1234-4321-1234-123456789012',
    transactionType: 1,
    amount: 123.45,
    isCompleted: false,
    isCanceled: false,
    createdOn: new Date(),
    createdBy: 'admin',
    updatedOn: new Date(),
    updatedBy: 'admin'
}

export const testCompleteDeposit = {
    id: '11111111-2222-4444-3333-222222222222',
    accountId: '87654321-4321-4321-4321-210987654321',
    customerId: '12345678-1234-4321-1234-123456789012',
    transactionType: 1,
    amount: 123.45,
    isCompleted: true,
    isCanceled: false,
    createdOn: new Date(),
    createdBy: 'admin',
    updatedOn: new Date(),
    updatedBy: 'admin'
}

export const testIncompleteWithdraw = {
    id: '11111111-2222-4444-3333-222222222222',
    accountId: '87654321-4321-4321-4321-210987654321',
    customerId: '12345678-1234-4321-1234-123456789012',
    transactionType: 2,
    amount: 123.45,
    isCompleted: false,
    isCanceled: false,
    createdOn: new Date(),
    createdBy: 'admin',
    updatedOn: new Date(),
    updatedBy: 'admin'
}

export const testCompleteWithdraw = {
    id: '11111111-2222-4444-3333-222222222222',
    accountId: '87654321-4321-4321-4321-210987654321',
    customerId: '12345678-1234-4321-1234-123456789012',
    transactionType: 2,
    amount: 123.45,
    isCompleted: true,
    isCanceled: true,
    createdOn: new Date(),
    createdBy: 'admin',
    updatedOn: new Date(),
    updatedBy: 'admin'
}

export const testTransactionCollection = [
    {
        id: '9bdf8e31-a20e-4204-900d-4f716a02484a',
        accountId: '39a78fd4-52e6-4880-a52f-7255c5d4ff2a',
        customerId: '710b2f0f-f1e7-4c45-a843-72f081ce37fa',
        transactionType: 2,
        amount: 123.45,
        isCompleted: true,
        isCanceled: false,
        createdOn: new Date(),
        createdBy: 'admin',
        updatedOn: new Date(),
        updatedBy: 'admin'
    },
    {
        id: '9bdf8e31-a20e-4204-900d-4f716a02484b',
        accountId: '39a78fd4-52e6-4880-a52f-7255c5d4ff2b',
        customerId: '710b2f0f-f1e7-4c45-a843-72f081ce37fb',
        transactionType: 2,
        amount: 123.45,
        isCompleted: false,
        isCanceled: false,
        createdOn: new Date(),
        createdBy: 'admin',
        updatedOn: new Date(),
        updatedBy: 'admin'
    },
    {
        id: '9bdf8e31-a20e-4204-900d-4f716a02484c',
        accountId: '39a78fd4-52e6-4880-a52f-7255c5d4ff2c',
        customerId: '710b2f0f-f1e7-4c45-a843-72f081ce37fc',
        transactionType: 1,
        amount: 123.45,
        isCompleted: true,
        isCanceled: true,
        createdOn: new Date(),
        createdBy: 'admin',
        updatedOn: new Date(),
        updatedBy: 'admin'
    },
    {
        id: '9bdf8e31-a20e-4204-900d-4f716a02484d',
        accountId: '39a78fd4-52e6-4880-a52f-7255c5d4ff2d',
        customerId: '710b2f0f-f1e7-4c45-a843-72f081ce37fd',
        transactionType: 1,
        amount: 123.45,
        isCompleted: false,
        isCanceled: false,
        createdOn: new Date(),
        createdBy: 'admin',
        updatedOn: new Date(),
        updatedBy: 'admin'
    },
]