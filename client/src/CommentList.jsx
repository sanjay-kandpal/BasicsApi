const CommentList = ({ comments }) => {
  return (
    <ul className="comment-list">
      {comments.map(comment => {
        let content;
        switch (comment.status) {
          case 'approved':
            content = comment.content;
            break;
          case 'pending':
            content = 'This comment is awaiting moderation';
            break;
          case 'rejected':
            content = 'This comment has been rejected';
            break;
          default:
            content = 'Unknown status';
        }
        return (
          <li key={comment.id} className="comment-item">
            {content}
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
