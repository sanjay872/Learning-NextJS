import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import {connectToDatabase} from '@utils/database';

console.log({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    async session({ session, token, user }) {
       
    },
    async signIn({profile}){
        try{
            await connectToDatabase();

            // check if user exists in database
            
            // if not, create user
            
            return true;
        }
        catch(err){
            console.log(err);
            return false;
        }

    }
});

export { handler as GET, handler as POST}