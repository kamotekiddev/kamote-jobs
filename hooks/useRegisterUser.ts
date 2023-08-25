import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { User } from '@prisma/client';

type Response = {
    data: User;
};

const useRegisterUser = <T>() =>
    useMutation<Response, AxiosError, T>((data) =>
        axios.post('/api/register', data)
    );

export default useRegisterUser;
