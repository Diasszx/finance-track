export const userMutations = {
  create: () => ['add-user'],
  auth: () => ['auth-user'],
}

export const transactionMutations = {
  create: ({ userId }) => ['add-transaction', userId],
  update: ({ userId }) => ['edit-transaction', userId],
}
