export async function GET(request) {
    const users=[
        {id:1, name: "John Doe"},
        {id:2, name: "Jane Doe"},
        {id:3, name: "John Smith"},
        {id:4, name: "Jane Smith"},
    ];

    //return new Response("GET request received");
    return new Response(JSON.stringify(users));
}

export async function POST(request) {  
    return new Response("POST request received");
}

export async function PUT(request) {
    return new Response("PUT request received");
}

export async function DELETE(request) {
    return new Response("DELETE request received");
}

export async function PATCH(request) {
    return new Response("PATCH request received");
}

export async function HEAD(request) {
    return new Response("HEAD request received");
}