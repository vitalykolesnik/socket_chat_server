import { Provider as ReduxProvider } from "react-redux";
import { appStore } from "1_app/appStore";
import { AppRouter } from "1_app/AppRouter";

import { TokenProvider } from "6_shared/context/TokenContext";
// import { SocketProvider } from "6_shared/context/SocketContext";

export const App = () => {
  return (
    <ReduxProvider store={appStore}>
      <TokenProvider>
        {/* <SocketProvider> */}
        <AppRouter />
        {/* </SocketProvider> */}
      </TokenProvider>
    </ReduxProvider>
  );
};
