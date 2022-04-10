import { useEffect, useReducer } from "react";

const initialState: State = {
  status: "pending",
  data: null,
  error: false,
};

type State = {
  data: any;
  status: string;
  error: boolean
};

type Action = {
  type: "pending" | "success" | "error";
  data?: null | object | [];
  error: boolean
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "pending":
      return {
        data: null,
        status: "pending",
        error: false,
      };
    case "success": {
      return {
        status: "success",
        data: action.data,
        error: false,
      };
    }
    case "error":
      return {
        status: "error",
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
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
        dispatch({ type: "error", error: true });
      }
    };
    request();
  }, []);

  return state;
};

export default useAsync;
