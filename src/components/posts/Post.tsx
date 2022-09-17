import { Avatar } from "../avatar/Avatar";
import styles from "../posts/styles.module.css"
import { format, formatDistanceToNow} from "date-fns";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Comment } from "../comment/Comment";


interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

interface postProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}



export function Post({ author, publishedAt, content}:postProps) {
   
  const publishedDateFormatted = format(publishedAt, "do 'of' LLLL 'at' h:mm")

  const timeDistanceToNow = formatDistanceToNow(publishedAt,{ addSuffix: true,
  })

  const [comments, setComments] = useState( [
    'top',
    'demais'                      
  ])

  const [newCommentText, setNewCommentText] = useState('')


  function handleNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText])

    setNewCommentText(" ")
  } 

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value)
  }

  function onDeleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
        return comment != commentToDelete;
      }
    )

    setComments(commentsWithoutDeletedOne)
  }
  
  function handleIvalidComment (event: InvalidEvent<HTMLTextAreaElement>) {
     event.target.setCustomValidity('This field is mandatory')
  }

  const isNewCommentEmpty = newCommentText.length === 0
  
  return (
    <article className={styles.post}>
      <header className={styles.postHeader}>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {timeDistanceToNow}
        </time>
      </header>
      <main className={styles.content}>

        {
          content.map( line => {
            if (line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>
            } else if(line.type === 'link') {
              return ( 
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
              )
            }
          })
        }
        
      </main>

      <form onSubmit={handleNewComment} className={styles.commentForm}>

        <strong>Leave your comment</strong>

        <textarea
          placeholder="Leave your comment"
          name='input'
          onChange={handleNewCommentChange}
          value={newCommentText}
          onInvalid={handleIvalidComment}
          required={true}
        />
        <footer  className={styles.button}>
          <button disabled={isNewCommentEmpty}type="submit">Comment</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        { comments.map(comment => {
            return (
            <Comment 
            key={comment} 
            content={comment}
            onDeleteComment={onDeleteComment}
            />
            )
          })}
      </div>
    </article>
  );
}

