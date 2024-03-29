import { ErrorGeneralModel } from './GeneralError';

export const typeGuardGeneralError = (tbd: any): tbd is ErrorGeneralModel => true;
