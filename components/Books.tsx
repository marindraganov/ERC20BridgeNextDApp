import Book from './Book'

const Books = ({books}) => {
  return (
    <div className="books">
        <div>
            <div className="book-value">ID</div>
            <div className="book-name">Name</div>
            <div className="book-value">Count</div>
            <div className="book-value">Available</div>
        </div>
        
        {books.map((book, index) => 
            <Book key={index} book={book}/>
        )}
    </div>
  )
}

export default Books