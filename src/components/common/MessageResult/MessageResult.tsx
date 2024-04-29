import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface Props {
  message: string;
  isError: boolean;
  isLoadingAction: boolean;
  loadingMessage?: string;
  maxWidth?: string;
}

const MessageResult = ({ message, isError, isLoadingAction, loadingMessage, maxWidth }: Props) => {
  if (isLoadingAction) {
    return (
      <div
        className={`mt-3 flex w-full  flex-row items-center justify-center text-center ${isError ? 'text-[var(--color-red-light)]' : 'text-[var(--color-green-light)]'}`}
      >
        <LoadingSpinner height="element" />
        {loadingMessage && (
          <div>
            <p className={'successClass'}>{loadingMessage}</p>
          </div>
        )}
      </div>
    );
  }
  if (!message) {
    return null;
  }
  return (
    <div
      style={{ maxWidth }}
      className={`mt-3 flex w-full  flex-col items-center justify-center ${isError ? 'text-[var(--color-red-light)]' : 'text-[var(--color-green-light)]'}`}
    >
      {!isLoadingAction && <p>{message}</p>}
    </div>
  );
};

export default MessageResult;
