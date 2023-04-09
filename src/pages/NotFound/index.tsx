import './NotFoundStyles.scss'

const NotFound = () => {
  return (
    <div className="notFound-container">
      <div className="notFound-block">
        <div className="notFound-text">This page does not exist</div>
        <a href="/">
          <button>Main page</button>
        </a>
      </div>
    </div>
  )
}

export default NotFound
