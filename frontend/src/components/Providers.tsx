import { Provider } from 'react-redux';
import { Store } from '../../State/Store'
import { ProviderType } from '../../utils/Types';
import { Toaster } from "react-hot-toast";
export default function Providers({ children }: ProviderType) {
    return <>
        <Provider store={Store}>
            <Toaster/>
            {children}
        </Provider>
    </>
}