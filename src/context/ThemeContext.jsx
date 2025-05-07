import { createContext, useReducer } from "react";

// 초기 상태 설정
const initialState = { isLight: true };

// 테마 변경 리듀서 함수
function reducer(state, action) {
  if (typeof action.isLight === "boolean") return { isLight: action.isLight };
}

// 전역 컨텍스트 생성
const ThemeContext = createContext();

// 테마 정보를 전역으로 전달할 프로바이더 컴포넌트 export
export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 테마 전용 전역 컨텍스트 export
export { ThemeContext };
