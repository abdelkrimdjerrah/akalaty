import Post from "../../components/post/Post";
import useGetPost from "../../hooks/useGetPost";
import AddPost from "../../components/post/AddPost";

function Home() {
  
  const posts: Entities.PostEntity[] = useGetPost() as Entities.PostEntity[];

  return (
    <div>
      <div className="flex flex-col gap-4">
        <AddPost />
        <div className="flex flex-col gap-5">
          {posts ? (
            posts.map((post) => (
              <div key={post._id}>
                <Post postObj={post} />
              </div>
            ))
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
