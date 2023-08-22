type Props = { title?: string };

const EmptyState = ({ title = 'No Record Found.' }: Props) => {
    return (
        <section className='rounded-lg border bg-white p-4 shadow-sm'>
            {title}
        </section>
    );
};

export default EmptyState;
