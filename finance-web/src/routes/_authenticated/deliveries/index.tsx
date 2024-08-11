import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/deliveries/')({
  component: () => <div>Hello /_authenticated/deliveries/!</div>
})