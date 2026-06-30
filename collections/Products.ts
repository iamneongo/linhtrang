import type { CollectionConfig } from 'payload';

import { createSlugField, imageUrlField, sortOrderField } from './shared.ts';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'category', 'sortOrder'],
    group: 'Nội dung website',
  },
  defaultSort: 'sortOrder',
  labels: {
    singular: 'Sản phẩm',
    plural: 'Sản phẩm',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Tên sản phẩm',
      required: true,
    },
    createSlugField('name'),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Danh mục',
      required: true,
    },
    {
      name: 'code',
      type: 'text',
      label: 'Mã sản phẩm',
      required: true,
      unique: true,
      index: true,
    },
    imageUrlField,
    {
      name: 'origin',
      type: 'text',
      label: 'Xuất xứ / thương hiệu',
      required: true,
    },
    {
      name: 'material',
      type: 'text',
      label: 'Chất liệu',
      required: true,
    },
    {
      name: 'size',
      type: 'text',
      label: 'Kích thước',
      required: true,
    },
    {
      name: 'price',
      type: 'text',
      label: 'Giá hiển thị',
      required: true,
      defaultValue: 'Liên hệ',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả',
      required: true,
    },
    sortOrderField,
  ],
};
