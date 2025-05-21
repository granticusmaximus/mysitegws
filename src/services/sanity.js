import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '2ilbcasw',   // <-- replace with your real ID
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
});
export default client;