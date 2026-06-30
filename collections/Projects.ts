import type { CollectionConfig } from 'payload';

import { createSlugField, imageUrlField, sortOrderField } from './shared.ts';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'year', 'sortOrder'],
    group: 'Nội dung website',
  },
  defaultSort: 'sortOrder',
  labels: {
    singular: 'Dự án',
    plural: 'Dự án',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tên dự án',
      required: true,
    },
    createSlugField('title'),
    {
      name: 'location',
      type: 'text',
      label: 'Vị trí',
      required: true,
    },
    imageUrlField,
    {
      name: 'category',
      type: 'text',
      label: 'Loại dự án',
      required: true,
    },
    {
      name: 'year',
      type: 'text',
      label: 'Năm hoàn thành',
      required: true,
    },
    {
      name: 'area',
      type: 'text',
      label: 'Diện tích',
      required: true,
    },
    {
      name: 'style',
      type: 'text',
      label: 'Phong cách',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Mô tả',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Hiển thị nổi bật ở trang chủ',
      defaultValue: true,
    },
    sortOrderField,
  ],
};
