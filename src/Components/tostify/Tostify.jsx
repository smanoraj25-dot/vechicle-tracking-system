
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShareButton = () => {
         // Show success toast
        const handelSumbmit=()=>{
            toast.success('Shared successfully!');
        }
    return (
            <>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </>
    );
};

export default ShareButton;