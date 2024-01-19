import { json } from "@remix-run/node";
import { auth } from "~/services/auth.server";
import { useLoaderData, Form } from "@remix-run/react";

export async function loader({ request }) {
    let user = await auth.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    return json(user);
}

export default function Protected() {
    const data = useLoaderData();

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <h1>Welcome {data.displayName}</h1>
            <ul>
                <li>You have {data._json.followers} followers</li>
                <li>You're following {data._json.following} people</li>
            </ul>
            <Form action="/logout" method="post">
                <button>Logout? Click me</button>
            </Form>
        </div>
    );
}