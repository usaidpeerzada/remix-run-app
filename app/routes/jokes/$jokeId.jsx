import { Link, useLoaderData, useParams } from "remix";
import { db } from "~/utils/db.server";

export const loader = async ({
    params
}) => {
    const joke = await db.joke.findUnique({
        where: { id: params.jokeId }
    });
    if (!joke) throw new Error("Joke not found");
    const data = { joke };
    return data;
};

export default function JokeRoute() {
    const data = useLoaderData();

    return (
        <div>
            <p>Here's your hilarious joke:</p>
            <p>{data.joke?.content}</p>
            <Link to=".">{data.joke?.name} Permalink</Link>
        </div>
    );
}

export function ErrorBoundary() {
    const { jokeId } = useParams();
    return (
        <div className="error-container">{`There was an error loading joke by the id ${jokeId}. Sorry.`}</div>
    );
}