export type DataSource = {
  id: string;
  name: string;
  type: string;
  status: string;
  latestImport: string;
};

export const initialDataSources: DataSource[] = [
  {
    id: "csv",
    name: "Transaction CSV",
    type: "File upload",
    status: "Enabled",
    latestImport: "22 Oct · 09:20",
  },
  {
    id: "sample",
    name: "Sample dataset",
    type: "Synthetic data",
    status: "Enabled",
    latestImport: "21 Oct · 16:10",
  },
];
