import {withAuth} from 'next-auth/middleware';
import {NextResponse} from 'next/server';
import {getToken} from 'next-auth/jwt';
import {PAGE_ROUTE} from "@/interface/route";

export default withAuth(
    function middleware(req) {

    },
    {
        callbacks: {
            async authorized({req}) {
                const path = req.nextUrl.pathname;

                const token = await getToken({
                    req,
                    secureCookie: true,
                });
                const pathParts = path.split('/');
                if('/'+pathParts[1] === PAGE_ROUTE.SPACE && pathParts.length > 2) {
                    // @ts-ignore
                    if ( !token?.user?.spaces?.includes(pathParts[2])) {
                        return false;
                    }
                }

                const allowdRoutes = [
                    PAGE_ROUTE.HOME,
                    PAGE_ROUTE.LOGIN,
                    PAGE_ROUTE.REGISTER,
                    PAGE_ROUTE.PERMISSION_DENIED,
                ];

                if(!allowdRoutes.includes(path) && !path.startsWith(PAGE_ROUTE.API)){
                    // @ts-ignore
                    if (!token?.user) {
                        return false;
                    }
                }


                return true;
            },
        },
    },
);