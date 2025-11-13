import type { CollectionConfig } from 'payload'

export const Feedbacks: CollectionConfig = {
  slug: 'feedbacks',
  admin: {
    useAsTitle: 'comments',
    defaultColumns: ['template', 'rating', 'name', 'createdAt'],
  },
  access: {
    // Allow public submissions of feedback
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'templates',
      required: true,
      label: 'Template',
      admin: {
        description: 'The template this feedback belongs to',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: false,
      label: 'Name',
    },
    {
      name: 'email',
      type: 'email',
      required: false,
      label: 'Email (optional)',
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      label: 'Rating (1-5)',
      admin: {
        description: 'A numeric rating from 1 (worst) to 5 (best)',
      },
    },
    {
      name: 'comments',
      type: 'textarea',
      required: false,
      label: 'Comments',
    },
  ],
}

export default Feedbacks
