import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ['/api/:path*', "/", "/api", "/webhook" ,"/api/66758fb7-a93a-4e89-b3c3-94c34b4c0014/checkout"],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};