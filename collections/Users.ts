import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Hệ thống',
  },
  auth: true,
  labels: {
    singular: 'Quản trị viên',
    plural: 'Quản trị viên',
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'Họ và tên',
    },
  ],
};
