import ButtonLink from '@/components/Button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
        <div className="flex flex-col items-center justify-center gap-4 h-full">
            <h1 className="text-6xl font-semibold">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-lg text-gray-500">The page you are looking for does not exist.</p>
      <ButtonLink link="/">Return Home</ButtonLink>
    </div>
  )
}