import type { CollectionConfig } from 'payload';

import { createSlugField, imageUrlField, sortOrderField } from './shared.ts';

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', 'sortOrder'],
    group: 'Nội dung website',
  },
  defaultSort: '-publishedAt',
  labels: {
    singular: 'Tin tức',
    plural: 'Tin tức',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tiêu đề',
      required: true,
    },
    createSlugField('title'),
    imageUrlField,
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Ngày đăng',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'author',
      type: 'text',
      label: 'Tác giả',
      required: true,
    },
    {
      name: 'summary',
      type: 'richText',
      label: 'Tóm tắt',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Nội dung',
      required: true,
    },
    sortOrderField,
  ],
};
