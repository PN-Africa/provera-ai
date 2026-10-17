import { apiClient } from "./client";

export interface FraudAssessment {
  transactionId: string;
  riskLevel: "low" | "medium" | "high";
  flagged: boolean;
  explanation?: string;
}

export const getFraudAssessment = async (
  transactionId: string,
): Promise<FraudAssessment> => {
  const response = await apiClient.get<FraudAssessment>(
    `/fraud/${transactionId}`,
  );

  return response.data;
};
