export interface IWeb3Context {
  connect: () => void;
  logout: () => void;
  executeTransaction: (cadence: string, args?: any, options?: any) => void;
  executeScript: (cadence: string, args?: any) => any;
  getAccountBalance: () => void;
  user: {
    loggedIn: boolean | null;
    addr: string;
  };
  transaction: {
    id: string | null;
    inProgress: boolean;
    status: number | null;
    errorMessage: string;
  };
}
