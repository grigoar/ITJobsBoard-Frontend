import { FederatedAccountError } from '../Users/FederatedAccountError';

export interface ErrorGeneralModel {
  data: {
    status: string;
    message: string;
    stack?: string;
    err?: {
      statusCode?: number;
      status?: string;
      isOperational?: boolean;
      extra?: { [key: string]: any } | FederatedAccountError;
    };
  };
  status: string;
}
