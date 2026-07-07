export const usersQueryKeys = {
  getAll: () => ['users'],
  getOne: (userId) => ['users', userId],
  getMe: () => ['users', 'me'],
  getBalanceRoot: (userId) => ['balance', userId],

  getBalance: ({ userId, from, to }) => ['balance', userId, { from, to }],
}
