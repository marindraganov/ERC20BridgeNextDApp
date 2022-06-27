const Book = ({book}) => {
  return (
      <div key={book.id.toNumber()}>
        <div className="book-value">{book.id.toNumber()}</div>
        <div className="book-name">{book.name}</div>
        <div className="book-value">{book.availableCopies}</div>
        <div className="book-value">{book.numberOfCopies}</div>
    </div>
  )
}

export default Book