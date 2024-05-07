import React from "react";

export default function Layout({ children }) {
    return (
        <div>
            <h2>Post</h2>
            <div>{children}</div>
        </div>
    );
}