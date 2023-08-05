import Post from "../../components/post/Post";
import useGetPostPage from "../../hooks/useGetPostPage";
import AddPost from "../../components/post/AddPost";
import Loader from "../../components/shared/Loader";
import { useCallback, useEffect, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";



function Home() {
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const { isLoading, isError, error, postPage, hasNextPage } = useGetPostPage(
    pageNum,6
  );

  useEffect(()=>{
    hasNextPage ? setLoading(true) : setLoading(false)
  },[hasNextPage])

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (post: any) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current?.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p className="center">There's an error</p>;

  const content = postPage.map((post, i) => {
    if (postPage.length === i + 1) {
      return (
        <div key={i}>
          <Post postObj={post} />
        </div>
      );
    }
    return (
      <div key={i} ref={lastPostRef}>
        <Post postObj={post} />
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <AddPost />
        <div className="flex flex-col gap-5">{postPage ? content : null}</div>
        {loading && (
          <div className="w-full flex justify-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
