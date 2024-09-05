import PageTitle from '@/components/PageTitle'
import { Link } from 'react-router-dom'
import PageSubTitle from '@/components/PageSubTitle'
const links = [
  { name: 'Random', to: '/random' },
  { name: 'Leaderboard', to: '/leaderboard' },
]
function NotFound() {
  return (
    <>
      <PageTitle title="404 Page Not Found" />
      <div className="text-center pt-3">
        <PageSubTitle
          subtitle="Were you looking for these?"
          subtitleColored=""
          color=""
        />
      </div>
      <ul className="hidden flex-1 justify-center text-primary md:flex xl:space-x-1">
        <li
          className="-my-0.5 pt-3 pb-3 rounded-sm gradient-p-to-y relative"
          key={'Home'}
        >
          <DesktopLink to={'/'}>{'Home'}</DesktopLink>
        </li>
        {links.map((link) => (
          <li
            className="-my-0.5 pt-3 pb-3 rounded-sm gradient-p-to-y relative"
            key={link.to}
          >
            <DesktopLink to={link.to}>{link.name}</DesktopLink>
          </li>
        ))}
      </ul>
    </>
  )
}
export function DesktopLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <Link
      to={to}
      className="rounded-md px-2 py-2 font-header text-base font-bold text-destructive mix-blend-luminosity transition-colors hover:bg-green lg:px-4 lg:text-xl"
    >
      {children}
    </Link>
  )
}
export default NotFound
