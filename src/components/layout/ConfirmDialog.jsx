import React from 'react';
import './css/confirmdialog.css';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmation-dialog-overlay">
            <div className="confirmation-dialog">
                <h3>{message}</h3>
                <div className="dialog-actions">
                    <button onClick={onConfirm} className="confirm-button">Yes</button>
                    <button onClick={onCancel} className="cancel-button">No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
