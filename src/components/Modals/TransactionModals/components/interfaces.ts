interface ISpecificParams {
  offerId?: string;
  saleName?: string;
  saleIcon?: string;
  saleId?: string;
}

interface ITransactionOverlay {
  id: string;
  tranType: string;
  rare?: string;
  backButton?: boolean;
  specificParams?: ISpecificParams;
}

interface IConnectButton {
  wallet: string;
}

interface IExchange {
  user: boolean;
}

interface ICancelButton {
  changedName?: string;
}

interface IResultStep {
  successText: string;
  success: boolean;
}

interface I2FA {
  closeModal: Function;
  dopFunc?: Function;
}

interface IConfirmButtons {
  setState: React.Dispatch<React.SetStateAction<number>>;
  selectedType: number;
}

interface IConfirmationStep {
  PriceJSX: () => JSX.Element;
}

interface ITransactionContext {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setModal: Function;
  selectRare: () => string | undefined;
  disableLeftPannel: boolean;
  setDisableLeftPannel: React.Dispatch<React.SetStateAction<boolean>>;
  tranType: string;
  backButton: boolean;
  specificParams: ISpecificParams;
}

export type {
  ITransactionOverlay,
  IConnectButton,
  IExchange,
  ITransactionContext,
  ICancelButton,
  IResultStep,
  IConfirmationStep,
  I2FA,
  IConfirmButtons,
  ISpecificParams,
}
