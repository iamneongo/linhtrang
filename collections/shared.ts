import type { Field, TextField } from 'payload';

import { slugify } from '../lib/slugify.ts';

export function createSlugField(sourceField: string): TextField {
  return {
    name: 'slug',
    type: 'text',
    label: 'Slug',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'Dùng cho URL public của website.',
    },
    hooks: {
      beforeValidate: [
        ({ data, value }) => {
          const current = typeof value === 'string' && value.trim() ? value : data?.[sourceField];
          return typeof current === 'string' ? slugify(current) : value;
        },
      ],
    },
  };
}

export const imageUrlField: Field = {
  name: 'imageUrl',
  type: 'upload',
  relationTo: 'media',
  label: 'Ảnh',
  required: true,
};

export const sortOrderField: Field = {
  name: 'sortOrder',
  type: 'number',
  label: 'Thứ tự hiển thị',
  defaultValue: 0,
  admin: {
    position: 'sidebar',
  },
};
