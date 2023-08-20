const getUserInitials = (userName: string) =>
    userName
        ?.split(' ')
        ?.map((word) => word[0].toUpperCase())
        .slice(0, 2)
        .join('');

export default getUserInitials;
