export type DialogCloseHandler = () => void;

export type DialogTestId = {
  title: unknown;
  content: unknown;
  actions: unknown;
};

export type DialogInterface = {
  onClose?: DialogCloseHandler;
  testId?: DialogTestId;
};
