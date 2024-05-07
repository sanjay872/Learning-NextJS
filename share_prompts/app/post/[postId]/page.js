import React from "react";

async function page({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`,
    { cache: "no-store" }
  );
  const data = await res.json();

  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{data.title}</div>
        <p class="text-green-700 text-base">
          {data.body}
        </p>
      </div>
    </div>
  );
}

export default page;
