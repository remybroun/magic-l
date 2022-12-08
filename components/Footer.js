import Link from './Link'


export default function Footer() {
  return (
    <footer>
      <div className="my-16 flex flex-col items-center">
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>Magic Lemp</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">Alert List</Link>
        </div>
      </div>
    </footer>
  )
}
