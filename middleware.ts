import { withAuth } from 'next-auth/middleware';

export default withAuth({ pages: { signIn: '/sign-in', signOut: '/sign-in' } });

export const config = {
    matcher: ['/jobs/:path*', '/explore/:path*'],
};
