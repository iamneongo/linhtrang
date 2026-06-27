import { NavGroup } from '@admin/types';

/**
 * Navigation configuration with RBAC support
 *
 * This configuration is used for both the sidebar navigation and Cmd+K bar.
 * Items are organized into groups, each rendered with a SidebarGroupLabel.
 *
 * RBAC Access Control:
 * Each navigation item can have an `access` property that controls visibility
 * based on permissions, plans, features, roles, and organization context.
 *
 * Examples:
 *
 * 1. Require organization:
 *    access: { requireOrg: true }
 *
 * 2. Require specific permission:
 *    access: { requireOrg: true, permission: 'org:teams:manage' }
 *
 * 3. Require specific plan:
 *    access: { plan: 'pro' }
 *
 * 4. Require specific feature:
 *    access: { feature: 'premium_access' }
 *
 * 5. Require specific role:
 *    access: { role: 'admin' }
 *
 * 6. Multiple conditions (all must be true):
 *    access: { requireOrg: true, permission: 'org:teams:manage', plan: 'pro' }
 *
 * Note: The `visible` function is deprecated but still supported for backward compatibility.
 * Use the `access` property for new items.
 */
export const navGroups: NavGroup[] = [
  {
    label: 'Quản lý nội dung',
    items: [
      {
        title: 'Tổng quan',
        url: '/dashboard/content',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['g', 'g'],
        items: []
      },
      {
        title: 'Sản phẩm',
        url: '/dashboard/content/products',
        icon: 'product',
        shortcut: ['s', 'p'],
        isActive: false,
        items: []
      },
      {
        title: 'Danh mục sản phẩm',
        url: '/dashboard/content/product-categories',
        icon: 'forms',
        isActive: false,
        items: []
      },
      {
        title: 'Dự án',
        url: '/dashboard/content/projects',
        icon: 'workspace',
        shortcut: ['d', 'a'],
        isActive: false,
        items: []
      },
      {
        title: 'Danh mục dự án',
        url: '/dashboard/content/project-categories',
        icon: 'forms',
        isActive: false,
        items: []
      },
      {
        title: 'Tin tức bài viết',
        url: '/dashboard/content/posts',
        icon: 'post',
        shortcut: ['t', 'b'],
        isActive: false,
        items: []
      },
      {
        title: 'Thư viện soạn thảo',
        url: '/dashboard/forms/basic',
        icon: 'text',
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Bổ trợ',
    items: [
      {
        title: 'Cài đặt giao diện',
        url: '/dashboard/elements/icons',
        icon: 'palette',
        isActive: false,
        items: []
      },
      {
        title: 'Tài khoản',
        url: '/dashboard/profile',
        icon: 'account',
        isActive: false,
        items: []
      },
      {
        title: 'Đăng xuất',
        url: '/',
        icon: 'logout',
        isActive: false,
        items: []
      }
    ]
  },
];

