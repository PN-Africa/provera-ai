export type SyntheticDatasetId =
  | "balanced"
  | "high-value"
  | "frequency"
  | "normal";

export const SYNTHETIC_DATASETS: {
  id: SyntheticDatasetId;
  name: string;
  description: string;
  fileName: string;
  csv: string;
}[] = [
  {
    id: "balanced",
    name: "Balanced sample",
    description: "A mix of ordinary transactions and risk indicators.",
    fileName: "Synthetic balanced sample.csv",
    csv: `transaction_id,amount,currency,date_time,transaction_type,customer_id,location,payment_method
PV-2001,25000,NGN,2026-10-10T09:00:00Z,transfer,C001,Lagos,bank transfer
PV-2002,950000,NGN,2026-10-10T09:05:00Z,transfer,C002,Lagos,bank transfer
PV-2003,45000,NGN,2026-10-10T10:00:00Z,payment,C003,Ibadan,card
PV-2004,45000,NGN,2026-10-10T10:02:00Z,payment,C003,Ibadan,card
PV-2005,32000,NGN,2026-10-10T11:30:00Z,transfer,C004,Abuja,bank transfer
PV-2006,18000,NGN,2026-10-10T12:00:00Z,payment,C005,Lagos,card
PV-2007,72000,NGN,2026-10-10T13:00:00Z,transfer,C006,Kano,bank transfer
PV-2008,12500,NGN,2026-10-10T14:00:00Z,payment,C007,Lagos,card
PV-2009,65000,NGN,2026-10-10T15:00:00Z,transfer,C008,Ibadan,bank transfer
PV-2010,28000,NGN,2026-10-10T16:00:00Z,payment,C009,Abuja,card`,
  },
  {
    id: "high-value",
    name: "High-value activity",
    description: "Several large transfers to demonstrate the amount threshold.",
    fileName: "Synthetic high-value activity.csv",
    csv: `transaction_id,amount,currency,date_time,transaction_type,customer_id,location,payment_method
PV-2101,45000,NGN,2026-10-11T08:00:00Z,transfer,C101,Lagos,bank transfer
PV-2102,275000,NGN,2026-10-11T08:15:00Z,transfer,C102,Lagos,bank transfer
PV-2103,680000,NGN,2026-10-11T08:30:00Z,transfer,C103,Abuja,bank transfer
PV-2104,12000,NGN,2026-10-11T09:00:00Z,payment,C104,Ibadan,card
PV-2105,1250000,NGN,2026-10-11T09:20:00Z,transfer,C105,Lagos,bank transfer
PV-2106,85000,NGN,2026-10-11T10:00:00Z,payment,C106,Kano,card
PV-2107,320000,NGN,2026-10-11T10:30:00Z,transfer,C107,Abuja,bank transfer
PV-2108,56000,NGN,2026-10-11T11:00:00Z,payment,C108,Lagos,card`,
  },
  {
    id: "frequency",
    name: "Unusual frequency",
    description: "Repeated activity by the same synthetic customer.",
    fileName: "Synthetic unusual frequency.csv",
    csv: `transaction_id,amount,currency,date_time,transaction_type,customer_id,location,payment_method
PV-2201,18000,NGN,2026-10-12T09:00:00Z,payment,C220,Lagos,card
PV-2202,22000,NGN,2026-10-12T09:02:00Z,payment,C220,Lagos,card
PV-2203,19500,NGN,2026-10-12T09:04:00Z,transfer,C220,Lagos,bank transfer
PV-2204,12000,NGN,2026-10-12T09:06:00Z,payment,C220,Lagos,card
PV-2205,35000,NGN,2026-10-12T10:00:00Z,payment,C221,Ibadan,card
PV-2206,27000,NGN,2026-10-12T10:30:00Z,transfer,C222,Abuja,bank transfer
PV-2207,14500,NGN,2026-10-12T11:00:00Z,payment,C223,Lagos,card
PV-2208,16000,NGN,2026-10-12T11:30:00Z,payment,C224,Kano,card`,
  },
  {
    id: "normal",
    name: "Normal activity",
    description: "Transactions that do not trigger the current demo rules.",
    fileName: "Synthetic normal activity.csv",
    csv: `transaction_id,amount,currency,date_time,transaction_type,customer_id,location,payment_method
PV-2301,12000,NGN,2026-10-13T08:00:00Z,payment,C301,Lagos,card
PV-2302,28000,NGN,2026-10-13T08:30:00Z,transfer,C302,Ibadan,bank transfer
PV-2303,45000,NGN,2026-10-13T09:00:00Z,payment,C303,Abuja,card
PV-2304,18500,NGN,2026-10-13T09:30:00Z,payment,C304,Lagos,card
PV-2305,62000,NGN,2026-10-13T10:00:00Z,transfer,C305,Kano,bank transfer
PV-2306,35000,NGN,2026-10-13T10:30:00Z,payment,C306,Ibadan,card
PV-2307,78000,NGN,2026-10-13T11:00:00Z,transfer,C307,Abuja,bank transfer
PV-2308,22500,NGN,2026-10-13T11:30:00Z,payment,C308,Lagos,card`,
  },
];
