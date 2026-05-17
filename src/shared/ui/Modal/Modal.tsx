import { useEffect } from 'react';
import { Button } from '@/shared/ui/Button';
import './Modal.scss';

interface ModalAction {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'danger';
}

interface ModalProps {
    title: string;
    text?: string;
    isOpen: boolean;
    actions: ModalAction[];
    onClose: () => void;
}

const Modal = ({ title, text, isOpen, actions, onClose }: ModalProps) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={title}
        >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal__title">{title}</h2>

                {text && <p className="modal__text">{text}</p>}

                <div className="modal__actions">
                    {actions.map((action) => (
                        <Button
                            key={action.label}
                            className={`modal__button modal__button--${action.variant ?? 'primary'}`}
                            onClick={action.onClick}
                        >
                            {action.label}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { Modal };