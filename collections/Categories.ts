import type { CollectionConfig } from 'payload';

import { createSlugField, imageUrlField, sortOrderField } from './shared.ts';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'badge', 'sortOrder'],
    group: 'Nội dung website',
  },
  defaultSort: 'sortOrder',
  labels: {
    singular: 'Danh mục',
    plural: 'Danh mục',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Tên danh mục',
      required: true,
    },
    createSlugField('name'),
    {
      name: 'iconName',
      type: 'text',
      label: 'Tên icon Lucide',
      required: true,
      defaultValue: 'HelpCircle',
    },
    imageUrlField,
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả',
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Nhãn nổi bật',
      required: true,
    },
    sortOrderField,
  ],
};
