import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </>
  )
}
