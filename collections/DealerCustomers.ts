import type { CollectionConfig } from 'payload';

export const DealerCustomers: CollectionConfig = {
  slug: 'dealer-customers',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'contactName', 'phone', 'tier', 'status'],
    group: 'Quản lý khách hàng',
  },
  defaultSort: '-updatedAt',
  labels: {
    singular: 'Khách hàng đại lý',
    plural: 'Khách hàng đại lý',
  },
  fields: [
    {
      name: 'customerCode',
      type: 'text',
      label: 'Mã đại lý',
      unique: true,
      index: true,
      admin: {
        description: 'Mã nội bộ để tra cứu nhanh đại lý.',
      },
    },
    {
      name: 'companyName',
      type: 'text',
      label: 'Tên công ty / đại lý',
      required: true,
    },
    {
      name: 'contactName',
      type: 'text',
      label: 'Người liên hệ',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Số điện thoại',
      required: true,
      index: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'taxCode',
      type: 'text',
      label: 'Mã số thuế',
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
      name: 'dealerType',
      type: 'select',
      label: 'Loại đại lý',
      required: true,
      defaultValue: 'showroom',
      options: [
        { label: 'Showroom', value: 'showroom' },
        { label: 'Nhà phân phối', value: 'distributor' },
        { label: 'Nhà thầu', value: 'contractor' },
        { label: 'Kiến trúc sư / thiết kế', value: 'designer' },
        { label: 'Đối tác khác', value: 'other' },
      ],
    },
    {
      name: 'tier',
      type: 'select',
      label: 'Hạng đại lý',
      required: true,
      defaultValue: 'standard',
      options: [
        { label: 'Tiêu chuẩn', value: 'standard' },
        { label: 'Bạc', value: 'silver' },
        { label: 'Vàng', value: 'gold' },
        { label: 'Kim cương', value: 'diamond' },
        { label: 'Chiến lược', value: 'strategic' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Trạng thái hợp tác',
      required: true,
      defaultValue: 'lead',
      options: [
        { label: 'Tiềm năng', value: 'lead' },
        { label: 'Đang hợp tác', value: 'active' },
        { label: 'Tạm dừng', value: 'paused' },
        { label: 'Ngừng hợp tác', value: 'inactive' },
      ],
    },
    {
      name: 'source',
      type: 'text',
      label: 'Nguồn khách',
      admin: {
        description: 'Ví dụ: hội chợ, giới thiệu, Facebook, telesales...',
      },
    },
    {
      name: 'contractStartedAt',
      type: 'date',
      label: 'Ngày bắt đầu hợp tác',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'contractEndedAt',
      type: 'date',
      label: 'Ngày kết thúc hợp tác',
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
