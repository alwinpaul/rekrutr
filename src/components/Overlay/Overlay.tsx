import { ReactNode } from "react";
import { createPortal } from "react-dom";
import CloseIcon from '@mui/icons-material/Close';

interface OverlayPropsInterface {
    children?: ReactNode;
    isOpen: boolean;
    closeModal: Function;
}

const Overlay = (props: OverlayPropsInterface) => {
    if (!props.isOpen) {
        return null;
    }

    const portalElement = document.getElementById('ov_portal');
    if (!portalElement) throw new Error("Failed to find the portal element");

    const emitClose = (e: any) => {
        e.stopPropagation();
        props.closeModal()
    }

    return (
        <>
            {
                createPortal(
                    <>
                        <section className="fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10 opacity-75 bg-slate-900" onClick={emitClose}>
                            <div className="fixed top-0 right-4 text-white">
                                <CloseIcon fontSize="large" className="cursor-pointer" onClick={emitClose} />
                            </div>
                        </section>
                        <section className="absolute top-0 left-0 right-0 bottom-0 w-3/4 m-auto h-full z-10 p-3">
                            {props.children}
                        </section>
                    </>,
                    portalElement)
            }
        </>
    )
}

export default Overlay;