import { randomDateLast6Months } from 'src/db/seed/seed.utils';
import { TenantModel } from 'src/tenant/model/tenant.model';

export const TENANTS: Omit<TenantModel, 'user'>[] = [
  {
    id: '2d55f99b-4e6b-4ded-be18-640fb30a5e17',
    createdAt: randomDateLast6Months(),
  },
  {
    id: 'e9b22811-d083-4882-b848-ecc3c4f6cf26',
    createdAt: randomDateLast6Months(),
  },
  {
    id: 'eb176a2b-7b5c-40dd-a44b-4d8b6be9aacc',
    createdAt: randomDateLast6Months(),
  },
  {
    id: 'f8794e88-9efa-4a3c-9df5-10ef92e102fa',
    createdAt: randomDateLast6Months(),
  },
  {
    id: '9006e4a4-9751-4acc-8db0-ca35a28a1a6a',
    createdAt: randomDateLast6Months(),
  },
  {
    id: '2b20bde9-4e6c-4d47-98cc-e247a8af512f',
    createdAt: randomDateLast6Months(),
  },
  {
    id: '98dbc768-ae31-4828-a049-bfef91f172b4',
    createdAt: randomDateLast6Months(),
  },
  {
    id: 'f67eecdc-c90d-46db-b872-e892f5c0e815',
    createdAt: randomDateLast6Months(),
  },
  {
    id: '2aff90a6-c25d-463e-9c8b-1b6cd8bde3eb',
    createdAt: randomDateLast6Months(),
  },
  {
    id: '107b47d2-11a9-4f8f-93c2-0828208d3b96',
    createdAt: randomDateLast6Months(),
  },
  {
    id: '50464c69-a262-4dc0-bd25-bde51a4836bb',
    createdAt: randomDateLast6Months(),
  },
  {
    id: '2f3882f3-e8cd-4cd0-9a2f-76cf33a51db5',
    createdAt: randomDateLast6Months(),
  },
  {
    id: 'a5a2ae34-7da3-4637-b241-5aa832bf8b90',
    createdAt: randomDateLast6Months(),
  },
  {
    id: 'e2b715ec-6cc8-4d64-87ce-50dc314d2268',
    createdAt: randomDateLast6Months(),
  },
  {
    id: 'a4a2f415-47ba-4de4-acb0-1e6c8674ea88',
    createdAt: randomDateLast6Months(),
  },
  {
    id: '6eaf87f6-cfba-4798-8880-17a460d9f29d',
    createdAt: randomDateLast6Months(),
  },
  {
    id: '1c2ca201-3914-4f06-80a6-6dbd28468288',
    createdAt: randomDateLast6Months(),
  },
  {
    id: 'ecb89180-0046-4d00-8f81-51cd70457b70',
    createdAt: randomDateLast6Months(),
  },
  {
    id: 'ece596d6-9fcd-4fdf-8eba-86c2fd35ed51',
    createdAt: randomDateLast6Months(),
  },
  {
    id: '59e30348-eaa0-4099-a17a-e9768941378d',
    createdAt: randomDateLast6Months(),
  },
];
