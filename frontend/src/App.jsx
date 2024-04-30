import AppLayout from "./components/layout/AppLayout"
import { CryptoContextProvide } from "./context/crypto-context";

export default function App() {
  return (
    <CryptoContextProvide>
      <AppLayout></AppLayout>
    </CryptoContextProvide>
  );
}
