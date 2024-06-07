import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/")({
	component: Dashboard,
});

function Dashboard() {
	return <Button>Hello /_auth/dashboard!</Button>;
}
