import type { CollectionConfig } from 'payload';

export const LoyalCustomers: CollectionConfig = {
  slug: 'loyal-customers',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'phone', 'membershipTier', 'points', 'status'],
    group: 'Quản lý khách hàng',
  },
  defaultSort: '-updatedAt',
  labels: {
    singular: 'Khách hàng thân thiết',
    plural: 'Khách hàng thân thiết',
  },
  fields: [
    {
      name: 'customerCode',
      type: 'text',
      label: 'Mã khách hàng',
      unique: true,
      index: true,
      admin: {
        description: 'Mã nội bộ để tra cứu khách nhanh hơn.',
      },
    },
    {
      name: 'fullName',
      type: 'text',
      label: 'Họ và tên',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Số điện thoại',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'birthday',
      type: 'date',
      label: 'Ngày sinh',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'city',
      type: 'text',
      label: 'Tỉnh / thành phố',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Địa chỉ',
    },
    {
      name: 'favoriteCategory',
      type: 'text',
      label: 'Nhóm sản phẩm quan tâm',
      admin: {
        description: 'Ví dụ: gạch ốp lát, thiết bị vệ sinh, nội thất...',
      },
    },
    {
      name: 'membershipTier',
      type: 'select',
      label: 'Hạng thành viên',
      required: true,
      defaultValue: 'member',
      options: [
        { label: 'Thành viên', value: 'member' },
        { label: 'Bạc', value: 'silver' },
        { label: 'Vàng', value: 'gold' },
        { label: 'Bạch kim', value: 'platinum' },
        { label: 'VIP', value: 'vip' },
      ],
    },
    {
      name: 'points',
      type: 'number',
      label: 'Điểm tích lũy',
      required: true,
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'totalSpent',
      type: 'number',
      label: 'Tổng chi tiêu',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Đơn vị: VND',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Trạng thái khách hàng',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Đang hoạt động', value: 'active' },
        { label: 'Tạm ngưng chăm sóc', value: 'paused' },
        { label: 'Ngừng theo dõi', value: 'inactive' },
      ],
    },
    {
      name: 'source',
      type: 'text',
      label: 'Nguồn khách',
      admin: {
        description: 'Ví dụ: showroom, giới thiệu, Facebook, Zalo...',
      },
    },
    {
      name: 'lastPurchaseAt',
      type: 'date',
      label: 'Lần mua gần nhất',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Ghi chú chăm sóc',
    },
  ],
};
