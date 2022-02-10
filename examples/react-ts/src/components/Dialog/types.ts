export type DialogCloseHandler = () => void;

export type DialogTestId = {
  title: string;
  content: string;
  actions: string;
};

export type DialogInterface = {
  onClose?: DialogCloseHandler;
  testId?: DialogTestId;
};
