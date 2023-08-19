import { RefObject, useEffect } from 'react';

type Params = {
    ref: RefObject<HTMLElement | null>;
    onOutsideClick: () => void;
};
function useOutsideClick({ ref, onOutsideClick }: Params) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                if (onOutsideClick) onOutsideClick();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onOutsideClick]);
}

export default useOutsideClick;
