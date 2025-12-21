import { memo } from 'react';
import './DisclaimerModal.css';

const DisclaimerModal = ({ showModal, handleClose }) => {
    if (!showModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-header">Terms & Conditions</h3>
                <p>* By proceeding, you agree to our return, exchange, and product policies.</p>
                <p>* No damage</p>
                <div className="modal-footer">
                    <button className="modal-btn cancel" onClick={() => handleClose(false)}>
                        Cancel
                    </button>
                    <button className="modal-btn accept" onClick={() => handleClose(true)}>
                        Agree
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(DisclaimerModal);
