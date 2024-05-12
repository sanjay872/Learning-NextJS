import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import {connectToDatabase} from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks:{
        async session({ session }) {
            const userSession = await User.findOne({email: session.user.email}); // find user in database
    
            session.user.id=userSession._id.toString(); // add user id to session
    
            return session; // return session
        },
        async signIn({profile}){
            try{
                await connectToDatabase();
    
                // check if user exists in database
                const userExists = await User.exists({email: profile.email});
    
                // if not, create user
                if(!userExists){
                    await User.create({
                        username: profile.name.replace(" ","").toLowerCase(),
                        email: profile.email,
                        image: profile.picture,
                    });
                }
    
                return true;
            }
            catch(err){
                console.log(err);
                return false;
            }
    
        }
    }
});

export { handler as GET, handler as POST}