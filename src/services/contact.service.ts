import api from "./api";

export interface CreateContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber?: string;
  address?: string;
  recaptchaToken: string;
}

export interface ContactResponse {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber: string | null;
  address: string | null;
  isRead: boolean;
  createdAt: string;
}

export const submitContact = async (
  payload: CreateContactPayload
): Promise<ContactResponse> => {
  const { data } = await api.post<ContactResponse>("/contacts", payload);
  return data;
};
