import { useCallback, useEffect, useReducer } from 'react';

const messageDisplayReducerConstants = {
  SHOW_ERROR: 'SHOW_ERROR',
  SHOW_SUCCESS: 'SHOW_SUCCESS',
  RESET: 'RESET',
};
interface CurrentMessageDisplayState {
  message: string;
  isError: boolean;
}
interface CurrentMessageDisplayAction {
  type: string;
  message?: string;
}
const initialMessageDisplayState: CurrentMessageDisplayState = {
  message: '',
  isError: false,
};

const messageDisplayReducer = (state: CurrentMessageDisplayState, action: CurrentMessageDisplayAction) => {
  if (action.type === messageDisplayReducerConstants.SHOW_ERROR) {
    return {
      message: action?.message || state?.message,
      isError: true,
    };
  }
  if (action.type === messageDisplayReducerConstants.SHOW_SUCCESS) {
    return {
      message: action?.message || state?.message,
      isError: false,
    };
  }
  if (action.type === messageDisplayReducerConstants.RESET) {
    return initialMessageDisplayState;
  }
  return initialMessageDisplayState;
};

const useDisplayResultMessage = (displayMessageDurationInSeconds = 5) => {
  const [messageDisplayState, dispatchMessageDisplay] = useReducer(messageDisplayReducer, initialMessageDisplayState);

  useEffect(() => {
    const clearMessageTimeout = setTimeout(
      () => {
        dispatchMessageDisplay({
          type: messageDisplayReducerConstants.RESET,
          message: '',
        });
      },
      displayMessageDurationInSeconds === 0 ? 1000 * 60 * 5 : displayMessageDurationInSeconds * 1000
    );
    return () => clearTimeout(clearMessageTimeout);
  }, [messageDisplayState, displayMessageDurationInSeconds]);

  const showResultErrorMessageHandler = useCallback((message: string) => {
    dispatchMessageDisplay({
      type: messageDisplayReducerConstants.SHOW_ERROR,
      message,
    });
  }, []);

  const showResultSuccessMessageHandler = useCallback((message: string) => {
    dispatchMessageDisplay({
      type: messageDisplayReducerConstants.SHOW_SUCCESS,
      message,
    });
  }, []);

  return {
    showResultSuccessMessage: showResultSuccessMessageHandler,
    showResultErrorMessage: showResultErrorMessageHandler,
    resultMessageDisplay: messageDisplayState.message,
    isMessageError: messageDisplayState.isError,
  };
};

export default useDisplayResultMessage;
