import {connectToDatabase} from '@utils/database';
import User from '@models/user';

export const GET = async (req, {params}) => {
    try {
        await connectToDatabase();
        console.log("at api"+params.id);
        const user = await User.findById(params.id);
        return new Response(JSON.stringify(user), {status: 200});
    }
    catch (err) {
        console.log(err);
        return new Response("Failed to get user", {status: 500});
    }
}