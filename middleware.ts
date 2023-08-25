import { withAuth } from 'next-auth/middleware';
import getCurrentUser from './actions/getCurrentUser';

export default withAuth({ pages: { signIn: '/sign-in', signOut: '/sign-in' } });

export const config = {
    matcher: ['/jobs/:path*', '/explore/:path*'],
};
