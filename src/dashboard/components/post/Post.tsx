import PostHeader from "./PostHeader";
import PostEngagement from "./PostEngagement";
import PostSlider from "./PostSlider";
import PostText from "./PostText";

const img1 = require("../../../assets/img1.jpeg");
const img2 = require("../../../assets/img2.jpeg");
const img3 = require("../../../assets/img3.jpeg");
const img4 = require("../../../assets/img4.jpeg");
const images: string[] = [img1, img2, img3, img4];

interface propsInterface {
  withImages?: boolean;
}
function Post(props: propsInterface) {
  return (
    <div className="w-full bg-white rounded-2xl relative p-5 py-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <PostHeader />
          <PostText />
          {props.withImages && <PostSlider images={images} />}
          <PostEngagement />
        </div>
      </div>
    </div>
  );
}

export default Post;
