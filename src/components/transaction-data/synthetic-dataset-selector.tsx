"use client";

import {
  SYNTHETIC_DATASETS,
  type SyntheticDatasetId,
} from "@/components/transaction-data/synthetic-datasets";

type SyntheticDatasetOption = (typeof SYNTHETIC_DATASETS)[number];

type SyntheticDatasetSelectorProps = {
  selectedDatasetId: SyntheticDatasetId;
  onDatasetChange: (datasetId: SyntheticDatasetId) => void;
  selectedDataset: SyntheticDatasetOption | undefined;
};

export function SyntheticDatasetSelector({
  selectedDatasetId,
  onDatasetChange,
  selectedDataset,
}: SyntheticDatasetSelectorProps) {
  return (
    <section className="rounded-[10px] border border-[#343644] bg-[#1C1D27] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-sans text-[15px] font-semibold text-[#EDEFFF]">
            Choose a synthetic dataset
          </h2>

          <p className="mt-1 text-[12px] leading-5 text-[#B7B9CB]">
            Explore different transaction scenarios using demo data.
          </p>
        </div>

        <div className="w-full sm:max-w-[280px]">
          <label
            htmlFor="synthetic-dataset"
            className="mb-2 block text-[12px] font-medium text-[#B7B9CB]"
          >
            Dataset
          </label>

          <select
            id="synthetic-dataset"
            value={selectedDatasetId}
            onChange={(event) =>
              onDatasetChange(event.target.value as SyntheticDatasetId)
            }
            className="h-11 w-full rounded-lg border border-[#343644] bg-[#222431] px-3 text-sm text-[#EDEFFF] outline-none focus:border-[#455EFF]"
          >
            {SYNTHETIC_DATASETS.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-3 text-[12px] leading-5 text-[#B7B9CB]">
        {selectedDataset?.description}
      </p>

      <p className="mt-2 text-[11px] leading-5 text-[#8F93AA]">
        Synthetic demo data only. Analysis uses local demonstration rules.
      </p>
    </section>
  );
}
