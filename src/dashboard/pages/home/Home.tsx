import Post from "../../components/post/Post";
import useGetPostPage from "../../hooks/useGetPostPage";
import AddPost from "../../components/post/AddPost";
import { useCallback, useRef, useState } from "react";

interface useGetPostPageInterface {
  isLoading: boolean
  isError: boolean
  error: any
  results: Entities.PostEntity[]
  hasNextPage: boolean
}

function Home() {
  

  const [pageNum, setPageNum] = useState(1)
    const {
        isLoading,
        isError,
        error,
        results,
        hasNextPage
    } = useGetPostPage(pageNum) as useGetPostPageInterface

    const intObserver = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useCallback((post: any) => {
    
      if (isLoading) return;
    
      if (intObserver.current) intObserver.current.disconnect();
    
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });
    
      if (post) intObserver.current?.observe(post);
    }, [isLoading, hasNextPage]);

    if (isError) return <p className='center'>Error: {error.message}</p>

    const content = results.map((post, i) => {
        if (results.length === i + 1) {
            return(
              <div key={i}>
                <Post postObj={post} />
              </div>
            ) 
        }
        return(
            <div key={i} ref={lastPostRef}>
              <Post postObj={post} />
            </div> 
        ) 
    })

  return (
    <div>
      <div className="flex flex-col gap-4">
        <AddPost />
        <div className="flex flex-col gap-5">
          {results ? content : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
