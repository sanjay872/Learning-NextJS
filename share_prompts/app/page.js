// static meta data
// export const meta = {
//   title: "Home Page",
//   description: "Home Page Description",
// };

// dynamic meta data
export async function generateMetaData({ params, searchParams}){
  const product=await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`,{cache:"no-store"});
  return {
    title: product.title,
    description: product.body,
  };
}

export default function Home() {
  return (
   <div>
    Home Page
   </div>
  );
}
