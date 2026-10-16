export const PRODUCT_CATEGORIES = [
  { id: 'renovation', name: 'Renovation', slug: 'renovation' },
  { id: 'building-plan-design', name: 'Building Plan & Design', slug: 'building-plan-design' },
  { id: 'building-approval-plans', name: 'Building Approval Plans', slug: 'building-approval-plans' },
  { id: 'elevation-design', name: 'Elevation Design', slug: 'elevation-design' },
  { id: 'fmb-marking', name: 'FMB Marking', slug: 'fmb-marking' },
  { id: 'construction-survey', name: 'Construction Survey', slug: 'construction-survey' },
  { id: 'layout-marking', name: 'Layout Marking', slug: 'layout-marking' },
  { id: 'construction-execution', name: 'Construction Execution', slug: 'construction-execution' },
  { id: 'general', name: 'General', slug: 'general' },
] as const;

export const CATEGORY_OPTIONS = PRODUCT_CATEGORIES.map((c) => c.name);
