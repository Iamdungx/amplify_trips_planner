import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyTeamDrive',
  access: (allow) => ({
    'trip-image/*': [
      // Cho phép người dùng đã xác thực thực hiện các thao tác: đọc, ghi, xóa
      allow.authenticated.to(['read', 'write', 'delete']),
      // Cho phép người dùng chưa xác thực thực hiện các thao tác: đọc
      allow.guest.to(['read', 'write', 'delete']),
      // Cho phép người dùng có quyền 'identity' thực hiện các thao tác: đọc, ghi, xóa
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
  }),
  isDefault: true,
});