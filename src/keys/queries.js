export const usersQueryKeys = {
  getAll: () => ['users'],
  getOne: (userId) => ['users', userId],
  getMe: () => ['users', 'me'],
}
