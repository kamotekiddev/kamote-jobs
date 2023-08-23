import { ClipLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='p-4'>
            <ClipLoader aria-label='Loading Spinner' data-testid='loader' />
        </div>
    );
};

export default Loading;
