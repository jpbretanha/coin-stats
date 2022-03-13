import { useEffect, useReducer } from "react";

const initialState = {
  status: "pending",
  data: null,
  error: null,
};

type State = {
  data: null | [] | object | undefined;
  status: string;
  error: null | object | undefined | string;
};

type Action = {
  type: string;
  data?: null | object | [];
  error: null | object | undefined | string;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "pending":
      return {
        data: null,
        status: "pending",
        error: null,
      };
    case "success": {
      return {
        status: "success",
        data: action.data,
        error: null,
      };
    }
    case "error":
      return {
        status: "error",
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
};

type AsyncFunction = () => Promise<any>;

// TODO: add possibility to paginate function
const useAsync = (asyncFunction: AsyncFunction) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const request = async () => {
      try {
        const response = await asyncFunction();
        dispatch({ type: "success", data: response.data } as Action);
      } catch (error: any) {
        dispatch({ type: "error", error });
      }
    };
    request();
  }, []);

  return state;
};

export default useAsync;
