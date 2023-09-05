import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';

type Response = {
    data: {};
};

type Error = AxiosError<{ message: string }>;

export const useSelectRole = () =>
    useMutation<Response, Error, string>((role) =>
        axios.put(`/api/user`, { role })
    );
