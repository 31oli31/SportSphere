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

                const secureRoutes = [
                    PAGE_ROUTE.SPACE,
                    PAGE_ROUTE.DASHBOARD,
                ];

                if(secureRoutes.includes(path)){
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